import { Component, signal, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PizzaService } from '../../services/pizza.service';
import { CartService } from '../../services/cart.service';
import { Pizza } from '../../models/pizza.model';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent implements OnInit {

  private readonly pizzaService = inject(PizzaService);
  private readonly cartService = inject(CartService);
  protected readonly pizzas = signal<Pizza[]>([]);
  protected readonly loading = signal<boolean>(true);
  protected readonly error = signal<string | null>(null);

  ngOnInit(): void {
    this.loadPizzas();
  }

  loadPizzas(): void {
    this.loading.set(true);
    this.error.set(null);

    this.pizzaService.getAllPizzas().subscribe({
      next: (data) => {
        this.pizzas.set(data);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Failed to load pizzas:', err);
        this.error.set('Failed to load the menu. Please check your network connection and try again.');
        this.loading.set(false);
      }
    });
  }

  onAddToCart(pizza: Pizza): void {
    this.cartService.addToCart(pizza);
  }
}
