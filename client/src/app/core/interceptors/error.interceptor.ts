import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { inject } from '@angular/core';
import { AlertService } from '../../services/alert.service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const alertService = inject(AlertService);
  
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let errorMessage = 'An unexpected connection error occurred. Please try again.';
      if (error.error instanceof ErrorEvent) {
        // Client-side error
        errorMessage = `Client Error: ${error.error.message}`;
      } else {
        // Server-side error
        errorMessage = error.error?.message || `Server Error: ${error.message} (Code: ${error.status})`;
      }
      
      // Trigger the global alert banner
      alertService.showAlert(errorMessage, 'error');
      
      console.error('HTTP Error caught by interceptor:', error);
      return throwError(() => new Error(errorMessage));
    })
  );
};
