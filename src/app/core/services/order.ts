import { Injectable, effect, signal } from '@angular/core';
import { CartItem } from './cart';
import { loadStored, saveStored } from '../storage';

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
  // Último estado que el cliente ya vio (sirve para avisarle de los cambios)
  seenStatus: OrderStatus;
}

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private _orders = signal<Order[]>(loadStored('shop_orders', []));
  orders = this._orders.asReadonly();

  constructor() {
    effect(() => saveStored('shop_orders', this._orders()));
  }

  create(data: Omit<Order, 'id' | 'date' | 'status' | 'seenStatus'>): Order {
    const nextId = Math.max(1000, ...this._orders().map((o) => o.id)) + 1;
    const order: Order = {
      ...data,
      id: nextId,
      date: new Date().toISOString(),
      status: 'pendiente',
      seenStatus: 'pendiente',
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

  // El cliente ya vio los estados actuales de sus pedidos
  markSeen(email: string) {
    this._orders.set(
      this._orders().map((o) => (o.userEmail === email ? { ...o, seenStatus: o.status } : o))
    );
  }
}