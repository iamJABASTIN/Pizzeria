import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { MenuComponent } from './pages/menu/menu.component';
import { CustomizerComponent } from './pages/customizer/customizer.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'Pizzeria - Home' },
  { path: 'order', component: MenuComponent, title: 'Pizzeria - Order Pizza' },
  { path: 'build', component: CustomizerComponent, title: 'Pizzeria - Build Your Pizza' },
  { path: '**', redirectTo: '' }
];

