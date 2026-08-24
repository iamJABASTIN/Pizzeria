import { Component, signal, computed, inject, OnInit } from '@angular/core';
import { ToppingService } from '../../services/topping.service';
import { CartService } from '../../services/cart.service';
import { Topping } from '../../models/topping.model';
import { Pizza } from '../../models/pizza.model';

@Component({
  selector: 'app-customizer',
  standalone: true,
  imports: [],
  templateUrl: './customizer.component.html',
  styleUrl: './customizer.component.css'
})
export class CustomizerComponent implements OnInit {
  private readonly toppingService = inject(ToppingService);
  private readonly cartService = inject(CartService);

  protected readonly toppings = signal<Topping[]>([]);
  protected readonly loading = signal<boolean>(true);
  protected readonly error = signal<string | null>(null);

  protected readonly selectedToppings = signal<Set<string>>(new Set());
  protected readonly showSummaryModal = signal<boolean>(false);
  protected readonly showWarningModal = signal<boolean>(false);
  protected readonly BASE_PRICE = 260;

  protected readonly selectedToppingsList = computed(() => {
    const selected = this.selectedToppings();
    return this.toppings().filter(t => selected.has(t._id));
  });

  protected readonly customPizzaTotalCost = computed(() => {
    return this.BASE_PRICE + this.totalCost();
  });

  ngOnInit(): void {
    this.loadToppings();
  }

  loadToppings(): void {
    this.loading.set(true);
    this.error.set(null);
    this.toppingService.getAllToppings().subscribe({
      next: (data) => {
        this.toppings.set(data);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Failed to load toppings:', err);
        this.error.set('Failed to load toppings. Please check your network connection and try again.');
        this.loading.set(false);
      }
    });
  }

  toggleTopping(toppingId: string): void {
    const current = new Set(this.selectedToppings());
    if (current.has(toppingId)) {
      current.delete(toppingId);
    } else {
      current.add(toppingId);
    }
    this.selectedToppings.set(current);
  }

  isToppingSelected(toppingId: string): boolean {
    return this.selectedToppings().has(toppingId);
  }

  protected readonly totalCost = computed(() => {
    const selected = this.selectedToppings();
    return this.toppings().reduce((sum, topping) => {
      if (selected.has(topping._id)) {
        return sum + topping.price;
      }
      return sum;
    }, 0);
  });

  onBuildPizza(): void {
    if (this.selectedToppingsList().length === 0) {
      this.showWarningModal.set(true);
      return;
    }
    this.showSummaryModal.set(true);
  }

  confirmBuildPizza(): void {
    const selectedToppingsList = this.selectedToppingsList();
    if (selectedToppingsList.length === 0) return;

    const isVeg = selectedToppingsList.every(t => t.isVeg);

    const customPizza: Pizza = {
      _id: 'custom_' + Date.now(),
      name: 'Your Pizza(Custom)',
      isVeg,
      price: this.customPizzaTotalCost(),
      description: 'A custom-built pizza with ' + selectedToppingsList.map(t => t.name).join(', '),
      ingredients: ['Custom Crust', 'Pizza Sauce', 'Cheese'],
      toppings: selectedToppingsList.map(t => t.name),
      image: '/custom pizza.webp'
    };

    this.cartService.addToCart(customPizza);
    
    // Reset selections and close modal
    this.selectedToppings.set(new Set());
    this.showSummaryModal.set(false);
  }

  closeSummaryModal(): void {
    this.showSummaryModal.set(false);
  }

  closeWarningModal(): void {
    this.showWarningModal.set(false);
  }
}
