import { Routes } from '@angular/router';
import { ProductList } from './features/catalog/product-list/product-list';
import { Login } from './features/auth/login/login';

export const routes: Routes = [
  { path: '', redirectTo: 'productos', pathMatch: 'full' },
  { path: 'productos', component: ProductList },
  { path: 'login', component: Login },
];