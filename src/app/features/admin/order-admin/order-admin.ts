import { Component, inject, signal } from '@angular/core';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { OrderService, OrderStatus } from '../../../core/services/order';

@Component({
  selector: 'app-order-admin',
  imports: [CurrencyPipe, DatePipe],
  templateUrl: './order-admin.html',
  styleUrl: './order-admin.scss',
})
export class OrderAdmin {
  orderService = inject(OrderService);

  statuses: OrderStatus[] = ['pendiente', 'procesando', 'enviado', 'entregado', 'cancelado'];
  message = signal('');

  changeStatus(id: number, event: Event) {
    const status = (event.target as HTMLSelectElement).value as OrderStatus;
    this.orderService.updateStatus(id, status);
    this.message.set(`Pedido #${id} actualizado a "${status}". Se notificará al cliente por correo.`);
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