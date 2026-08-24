import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pizza } from '../models/pizza.model';

export interface OrderItemPayload {
  pizza: {
    name: string;
    isVeg: boolean;
    price: number;
    description: string;
    ingredients: string[];
    toppings: string[];
    image: string;
  };
  quantity: number;
}

export interface OrderPayload {
  items: OrderItemPayload[];
  totalPrice: number;
}

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = '/api/orders';

  placeOrder(order: OrderPayload): Observable<{ success: boolean; message: string; data: any }> {
    return this.http.post<{ success: boolean; message: string; data: any }>(this.apiUrl, order);
  }
}
