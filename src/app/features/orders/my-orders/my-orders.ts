import { Component, inject } from '@angular/core';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth';
import { OrderService, OrderStatus } from '../../../core/services/order';

@Component({
  selector: 'app-my-orders',
  imports: [CurrencyPipe, DatePipe, RouterLink],
  templateUrl: './my-orders.html',
  styleUrl: './my-orders.scss',
})
export class MyOrders {
  private auth = inject(AuthService);
  private orderService = inject(OrderService);

  orders = this.orderService.getByUser(this.auth.user()!.email);

  badgeClass(status: OrderStatus): string {
    switch (status) {
      case 'pendiente':
        return 'bg-warning text-dark';
      case 'procesando':
        return 'bg-info text-dark';
      case 'enviado':
        return 'bg-primary';
      case 'entregado':
        return 'bg-success';
      case 'cancelado':
        return 'bg-danger';
    }
  }
}