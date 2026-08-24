import { Component, signal, computed, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService, CartItem } from '../../services/cart.service';
import { OrderService } from '../../services/order.service';
import { ToppingService } from '../../services/topping.service';
import { Topping } from '../../models/topping.model';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
  protected readonly cartService = inject(CartService);
  private readonly orderService = inject(OrderService);
  private readonly toppingService = inject(ToppingService);
  private readonly router = inject(Router);

  protected readonly toppings = signal<Topping[]>([]);
  protected readonly showIngredientsDropdown = signal<boolean>(false);
  protected readonly showSuccessModal = signal<boolean>(false);
  protected readonly isPaying = signal<boolean>(false);

  ngOnInit(): void {
    // Load toppings to map prices for the custom toppings breakdown list
    this.toppingService.getAllToppings().subscribe({
      next: (data) => this.toppings.set(data),
      error: (err) => console.error('Failed to load toppings for cart breakdown:', err)
    });
  }

  // Splits: total cost for all pizza bases (standard price or ₹260 for custom pizzas)
  protected readonly pizzaTotal = computed(() => {
    return this.cartService.items().reduce((sum, item) => {
      const isCustom = item.pizza.name === 'Custom Pizza' || item.pizza._id.startsWith('custom_');
      const baseCost = isCustom ? 260 : item.pizza.price;
      return sum + (baseCost * item.quantity);
    }, 0);
  });

  // Splits: total cost for all ingredients/toppings on custom pizzas
  protected readonly ingredientsTotal = computed(() => {
    return this.cartService.items().reduce((sum, item) => {
      const isCustom = item.pizza.name === 'Custom Pizza' || item.pizza._id.startsWith('custom_');
      const toppingsCost = isCustom ? Math.max(0, item.pizza.price - 260) : 0;
      return sum + (toppingsCost * item.quantity);
    }, 0);
  });

  protected readonly grandTotal = computed(() => {
    return this.cartService.totalPrice();
  });

  // Aggregated list of custom toppings in the cart with their prices and total quantity
  protected readonly customToppingsList = computed(() => {
    const toppingsMap = new Map<string, number>();
    this.toppings().forEach(t => toppingsMap.set(t.name, t.price));

    const grouped = new Map<string, { price: number; quantity: number }>();
    this.cartService.items().forEach(item => {
      const isCustom = item.pizza.name === 'Custom Pizza' || item.pizza._id.startsWith('custom_');
      if (isCustom && item.pizza.toppings) {
        item.pizza.toppings.forEach(toppingName => {
          const price = toppingsMap.get(toppingName) || 0;
          const qty = item.quantity;
          const existing = grouped.get(toppingName);
          if (existing) {
            existing.quantity += qty;
          } else {
            grouped.set(toppingName, { price, quantity: qty });
          }
        });
      }
    });

    return Array.from(grouped.entries()).map(([name, data]) => ({
      name,
      price: data.price,
      quantity: data.quantity
    }));
  });

  protected toggleIngredientsDropdown(): void {
    this.showIngredientsDropdown.update(val => !val);
  }

  protected updateQty(item: CartItem, amount: number): void {
    this.cartService.updateQuantity(item.pizza._id, item.quantity + amount);
  }

  protected removeItem(item: CartItem): void {
    this.cartService.removeFromCart(item.pizza._id);
  }

  protected clearCart(): void {
    this.cartService.clearCart();
  }

  protected placeOrder(): void {
    if (this.cartService.items().length === 0) return;

    this.isPaying.set(true);

    const payload = {
      items: this.cartService.items().map(item => ({
        pizza: {
          name: item.pizza.name,
          isVeg: item.pizza.isVeg,
          price: item.pizza.price,
          description: item.pizza.description,
          ingredients: item.pizza.ingredients,
          toppings: item.pizza.toppings,
          image: item.pizza.image
        },
        quantity: item.quantity
      })),
      totalPrice: this.cartService.totalPrice()
    };

    this.orderService.placeOrder(payload).subscribe({
      next: () => {
        this.isPaying.set(false);
        this.showSuccessModal.set(true);
        this.cartService.clearCart();
      },
      error: (err) => {
        this.isPaying.set(false);
        console.error('Failed to place order:', err);
        alert('Failed to place order. Please try again.');
      }
    });
  }

  protected closeSuccessModal(): void {
    this.showSuccessModal.set(false);
    this.router.navigate(['/']);
  }
}
