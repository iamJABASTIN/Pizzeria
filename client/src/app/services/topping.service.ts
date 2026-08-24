import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Topping } from '../models/topping.model';

@Injectable({
  providedIn: 'root'
})
export class ToppingService {
  private readonly http = inject(HttpClient);
  // Backend is running on port 9000
  private readonly apiUrl = 'http://localhost:9000/api/toppings';

  getAllToppings(): Observable<Topping[]> {
    return this.http.get<{ success: boolean, data: Topping[] }>(this.apiUrl).pipe(
      map(res => res.data)
    );
  }
}
