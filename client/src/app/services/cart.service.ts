import { Injectable, signal, computed } from '@angular/core';
import { Pizza } from '../models/pizza.model';

export interface CartItem {
  pizza: Pizza;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private readonly cartItems = signal<CartItem[]>([]);

  readonly items = computed(() => this.cartItems());
  readonly totalItemsCount = computed(() => 
    this.cartItems().reduce((acc, item) => acc + item.quantity, 0)
  );
  readonly totalPrice = computed(() => 
    this.cartItems().reduce((acc, item) => acc + (item.pizza.price * item.quantity), 0)
  );

  addToCart(pizza: Pizza): void {
    this.cartItems.update(items => {
      const existingItem = items.find(item => item.pizza._id === pizza._id);
      if (existingItem) {
        return items.map(item => 
          item.pizza._id === pizza._id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...items, { pizza, quantity: 1 }];
      }
    });
  }

  removeFromCart(pizzaId: string): void {
    this.cartItems.update(items => 
      items.filter(item => item.pizza._id !== pizzaId)
    );
  }

  updateQuantity(pizzaId: string, quantity: number): void {
    if (quantity <= 0) {
      this.removeFromCart(pizzaId);
      return;
    }
    this.cartItems.update(items => 
      items.map(item => 
        item.pizza._id === pizzaId 
          ? { ...item, quantity }
          : item
      )
    );
  }

  clearCart(): void {
    this.cartItems.set([]);
  }
}
