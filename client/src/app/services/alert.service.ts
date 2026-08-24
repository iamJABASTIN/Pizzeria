import { Injectable, signal } from '@angular/core';

export interface Alert {
  message: string;
  type: 'success' | 'error' | 'info';
}

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  private readonly currentAlert = signal<Alert | null>(null);
  readonly alert = this.currentAlert.asReadonly();

  showAlert(message: string, type: 'success' | 'error' | 'info' = 'info'): void {
    this.currentAlert.set({ message, type });
    setTimeout(() => {
      this.clearAlert();
    }, 5000);
  }

  clearAlert(): void {
    this.currentAlert.set(null);
  }
}
