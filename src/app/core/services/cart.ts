import { Injectable, computed, signal } from '@angular/core';
import { Product } from '../models/product';

export interface CartItem {
  product: Product;
  quantity: number;
}

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private _items = signal<CartItem[]>([]);

  items = this._items.asReadonly();

  count = computed(() =>
    this._items().reduce((total, item) => total + item.quantity, 0)
  );

  total = computed(() =>
    this._items().reduce((total, item) => total + item.product.price * item.quantity, 0)
  );

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

  clear() {
    this._items.set([]);
  }
}