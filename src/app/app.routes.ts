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
import { AdminLayout } from './features/admin/admin-layout/admin-layout';
import { Dashboard } from './features/admin/dashboard/dashboard';
import { ProductAdmin } from './features/admin/product-admin/product-admin';
import { ProductForm } from './features/admin/product-form/product-form';
import { CategoryAdmin } from './features/admin/category-admin/category-admin';
import { OrderAdmin } from './features/admin/order-admin/order-admin';
import { UserAdmin } from './features/admin/user-admin/user-admin';
import { CouponAdmin } from './features/admin/coupon-admin/coupon-admin';
import { authGuard } from './core/guards/auth-guard';
import { adminGuard } from './core/guards/admin-guard';

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
  {
    path: 'admin',
    component: AdminLayout,
    canActivate: [adminGuard],
    children: [
      { path: '', component: Dashboard },
      { path: 'productos', component: ProductAdmin },
      { path: 'productos/nuevo', component: ProductForm },
      { path: 'productos/:id/editar', component: ProductForm },
      { path: 'categorias', component: CategoryAdmin },
      { path: 'pedidos', component: OrderAdmin },
      { path: 'usuarios', component: UserAdmin },
      { path: 'cupones', component: CouponAdmin },
    ],
  },
];