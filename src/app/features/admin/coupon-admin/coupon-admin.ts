import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CouponService, CouponType } from '../../../core/services/coupon';

@Component({
  selector: 'app-coupon-admin',
  imports: [ReactiveFormsModule],
  templateUrl: './coupon-admin.html',
  styleUrl: './coupon-admin.scss',
})
export class CouponAdmin {
  private fb = inject(FormBuilder);
  couponService = inject(CouponService);

  error = '';

  form = this.fb.nonNullable.group({
    code: ['', [Validators.required, Validators.minLength(3)]],
    type: ['porcentaje' as CouponType, Validators.required],
    value: [0, [Validators.required, Validators.min(1)]],
  });

  save() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const { code, type, value } = this.form.getRawValue();

    if (type === 'porcentaje' && value > 100) {
      this.error = 'El porcentaje no puede ser mayor a 100.';
      return;
    }
    if (this.couponService.coupons().some((c) => c.code === code.trim().toUpperCase())) {
      this.error = 'Ese código ya existe.';
      return;
    }

    this.error = '';
    this.couponService.create({ code, type, value, active: true });
    this.form.reset({ code: '', type: 'porcentaje', value: 0 });
  }

  remove(id: number, code: string) {
    if (confirm(`¿Eliminar el cupón "${code}"?`)) {
      this.couponService.delete(id);
    }
  }
}