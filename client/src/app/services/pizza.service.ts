import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Pizza } from '../models/pizza.model';

@Injectable({
  providedIn: 'root'
})
export class PizzaService {
  private readonly http = inject(HttpClient);
  // Backend is running on port 9000
  private readonly apiUrl = 'http://localhost:9000/api/pizzas';

  getAllPizzas(): Observable<Pizza[]> {
    return this.http.get<{ success: boolean, data: Pizza[] }>(this.apiUrl, {
      headers: { 'x-skip-error-toast': 'true' }
    }).pipe(
      map(res => res.data)
    );
  }
}
