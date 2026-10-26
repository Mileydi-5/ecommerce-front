import { Injectable, signal } from '@angular/core';

export type CouponType = 'porcentaje' | 'monto';

export interface Coupon {
  id: number;
  code: string;
  type: CouponType;
  value: number;
  active: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class CouponService {
  private _coupons = signal<Coupon[]>([
    { id: 1, code: 'BIENVENIDO10', type: 'porcentaje', value: 10, active: true },
    { id: 2, code: 'AHORRA50', type: 'monto', value: 50, active: true },
  ]);

  coupons = this._coupons.asReadonly();

  create(data: Omit<Coupon, 'id'>) {
    const nextId = Math.max(0, ...this._coupons().map((c) => c.id)) + 1;
    this._coupons.set([...this._coupons(), { ...data, code: data.code.toUpperCase(), id: nextId }]);
  }

  toggle(id: number) {
    this._coupons.set(this._coupons().map((c) => (c.id === id ? { ...c, active: !c.active } : c)));
  }

  delete(id: number) {
    this._coupons.set(this._coupons().filter((c) => c.id !== id));
  }

  findValid(code: string): Coupon | undefined {
    return this._coupons().find((c) => c.active && c.code === code.trim().toUpperCase());
  }
}