import { Routes } from '@angular/router';
import { ProductList } from './features/catalog/product-list/product-list';
import { ProductDetail } from './features/catalog/product-detail/product-detail';
import { Login } from './features/auth/login/login';
import { Register } from './features/auth/register/register';
import { ForgotPassword } from './features/auth/forgot-password/forgot-password';
import { Cart } from './features/cart/cart/cart';
import { Checkout } from './features/checkout/checkout/checkout';
import { OrderSuccess } from './features/checkout/order-success/order-success';
import { MyOrders } from './features/orders/my-orders/my-orders';
import { Profile } from './features/profile/profile/profile';
import { authGuard } from './core/guards/auth-guard';

export const routes: Routes = [
  { path: '', redirectTo: 'productos', pathMatch: 'full' },
  { path: 'productos', component: ProductList },
  { path: 'productos/:id', component: ProductDetail },
  { path: 'login', component: Login },
  { path: 'registro', component: Register },
  { path: 'recuperar', component: ForgotPassword },
  { path: 'carrito', component: Cart },
  { path: 'checkout', component: Checkout, canActivate: [authGuard] },
  { path: 'pedido-confirmado/:id', component: OrderSuccess, canActivate: [authGuard] },
  { path: 'mis-pedidos', component: MyOrders, canActivate: [authGuard] },
  { path: 'perfil', component: Profile, canActivate: [authGuard] },
];