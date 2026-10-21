import { Routes } from '@angular/router';
import { ProductList } from './features/catalog/product-list/product-list';
import { ProductDetail } from './features/catalog/product-detail/product-detail';
import { Login } from './features/auth/login/login';
import { Register } from './features/auth/register/register';
import { Cart } from './features/cart/cart/cart';

export const routes: Routes = [
  { path: '', redirectTo: 'productos', pathMatch: 'full' },
  { path: 'productos', component: ProductList },
  { path: 'productos/:id', component: ProductDetail },
  { path: 'login', component: Login },
  { path: 'registro', component: Register },
  { path: 'carrito', component: Cart },
];