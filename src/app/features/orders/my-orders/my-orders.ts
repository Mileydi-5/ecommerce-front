import { Component, computed, inject } from '@angular/core';
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

  private email = this.auth.user()!.email;

  orders = computed(() => this.orderService.orders().filter((o) => o.userEmail === this.email));

  // Pedidos cuyo estado cambió desde la última vez que el cliente entró
  changed = this.orders().filter((o) => o.status !== o.seenStatus);

  constructor() {
    this.orderService.markSeen(this.email);
  }

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