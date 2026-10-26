import { Component, inject } from '@angular/core';
import { AuthService } from '../../../core/services/auth';
import { ProductService } from '../../../core/services/product';
import { OrderService } from '../../../core/services/order';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {
  auth = inject(AuthService);
  private productService = inject(ProductService);
  private orderService = inject(OrderService);

  productCount = this.productService.getAll().length;
  orderCount = this.orderService.orders().length;
}