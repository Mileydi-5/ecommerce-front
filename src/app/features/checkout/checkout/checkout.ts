import { Component, inject } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CartService } from '../../../core/services/cart';
import { AuthService } from '../../../core/services/auth';
import { OrderService } from '../../../core/services/order';

@Component({
  selector: 'app-checkout',
  imports: [ReactiveFormsModule, CurrencyPipe, RouterLink],
  templateUrl: './checkout.html',
  styleUrl: './checkout.scss',
})
export class Checkout {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private auth = inject(AuthService);
  private orders = inject(OrderService);
  cart = inject(CartService);

  form = this.fb.nonNullable.group({
    fullName: ['', [Validators.required, Validators.minLength(3)]],
    phone: ['', [Validators.required, Validators.pattern(/^[0-9]{8}$/)]],
    address: ['', [Validators.required, Validators.minLength(5)]],
    city: ['', Validators.required],
    department: ['', Validators.required],
    paymentMethod: ['tarjeta', Validators.required],
  });

  confirm() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const { paymentMethod, ...address } = this.form.getRawValue();

    const order = this.orders.create({
      userEmail: this.auth.user()!.email,
      items: this.cart.items(),
      total: this.cart.total(),
      address,
      paymentMethod,
    });

    this.cart.clear();
    this.router.navigate(['/pedido-confirmado', order.id]);
  }
}