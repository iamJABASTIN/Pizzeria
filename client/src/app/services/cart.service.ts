import { Injectable, signal, computed, effect } from '@angular/core';
import { Pizza } from '../models/pizza.model';

export interface CartItem {
  pizza: Pizza;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private readonly STORAGE_KEY = 'pizzeria_cart_items';
  private readonly cartItems = signal<CartItem[]>(this.loadCartFromStorage());

  readonly items = computed(() => this.cartItems());
  readonly totalItemsCount = computed(() =>
    this.cartItems().reduce((acc, item) => acc + item.quantity, 0)
  );
  readonly totalPrice = computed(() =>
    this.cartItems().reduce((acc, item) => acc + (item.pizza.price * item.quantity), 0)
  );

  constructor() {
    effect(() => {
      this.saveCartToStorage(this.cartItems());
    });
  }

  private loadCartFromStorage(): CartItem[] {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      console.error('Failed to load cart from storage:', e);
      return [];
    }
  }

  private saveCartToStorage(items: CartItem[]): void {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.error('Failed to save cart to storage:', e);
    }
  }

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
