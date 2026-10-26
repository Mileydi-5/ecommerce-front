import { Injectable, computed, inject, signal } from '@angular/core';
import { Product } from '../models/product';
import { Coupon, CouponService } from './coupon';

export interface CartItem {
  product: Product;
  quantity: number;
}

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private couponService = inject(CouponService);

  private _items = signal<CartItem[]>([]);
  private _coupon = signal<Coupon | null>(null);

  items = this._items.asReadonly();
  coupon = this._coupon.asReadonly();

  count = computed(() =>
    this._items().reduce((total, item) => total + item.quantity, 0)
  );

  subtotal = computed(() =>
    this._items().reduce((total, item) => total + item.product.price * item.quantity, 0)
  );

  discount = computed(() => {
    const c = this._coupon();
    if (!c) return 0;
    const value = c.type === 'porcentaje' ? (this.subtotal() * c.value) / 100 : c.value;
    return Math.min(value, this.subtotal());
  });

  total = computed(() => this.subtotal() - this.discount());

  add(product: Product, quantity = 1) {
    const current = this._items();
    const existing = current.find((i) => i.product.id === product.id);

    if (existing) {
      this._items.set(
        current.map((i) =>
          i.product.id === product.id
            ? { ...i, quantity: Math.min(i.quantity + quantity, product.stock) }
            : i
        )
      );
    } else {
      this._items.set([...current, { product, quantity: Math.min(quantity, product.stock) }]);
    }
  }

  setQuantity(productId: number, quantity: number) {
    this._items.set(
      this._items().map((i) =>
        i.product.id === productId
          ? { ...i, quantity: Math.max(1, Math.min(quantity, i.product.stock)) }
          : i
      )
    );
  }

  remove(productId: number) {
    this._items.set(this._items().filter((i) => i.product.id !== productId));
  }

  applyCoupon(code: string): boolean {
    const found = this.couponService.findValid(code);
    if (!found) return false;
    this._coupon.set(found);
    return true;
  }

  removeCoupon() {
    this._coupon.set(null);
  }

  clear() {
    this._items.set([]);
    this._coupon.set(null);
  }
}