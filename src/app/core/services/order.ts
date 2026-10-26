import { Injectable, signal } from '@angular/core';
import { CartItem } from './cart';

export type OrderStatus = 'pendiente' | 'procesando' | 'enviado' | 'entregado' | 'cancelado';

export interface ShippingAddress {
  fullName: string;
  phone: string;
  address: string;
  city: string;
  department: string;
}

export interface Order {
  id: number;
  date: string;
  userEmail: string;
  items: CartItem[];
  total: number;
  address: ShippingAddress;
  paymentMethod: string;
  status: OrderStatus;
}

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private _orders = signal<Order[]>([]);
  orders = this._orders.asReadonly();

  create(data: Omit<Order, 'id' | 'date' | 'status'>): Order {
    const order: Order = {
      ...data,
      id: 1000 + this._orders().length + 1,
      date: new Date().toISOString(),
      status: 'pendiente',
    };
    this._orders.set([...this._orders(), order]);
    return order;
  }

  getByUser(email: string): Order[] {
    return this._orders().filter((o) => o.userEmail === email);
  }

  updateStatus(id: number, status: OrderStatus) {
    this._orders.set(this._orders().map((o) => (o.id === id ? { ...o, status } : o)));
  }
}