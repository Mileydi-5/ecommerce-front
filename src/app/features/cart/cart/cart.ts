import { Component, inject } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CartService } from '../../../core/services/cart';

@Component({
  selector: 'app-cart',
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './cart.html',
  styleUrl: './cart.scss',
})
export class Cart {
  cart = inject(CartService);
  couponMessage = '';
  couponOk = false;

  changeQuantity(productId: number, event: Event) {
    const value = Number((event.target as HTMLInputElement).value);
    this.cart.setQuantity(productId, value);
  }

  applyCoupon(code: string) {
    this.couponOk = this.cart.applyCoupon(code);
    this.couponMessage = this.couponOk ? 'Cupón aplicado.' : 'Cupón no válido o inactivo.';
  }

  removeCoupon() {
    this.cart.removeCoupon();
    this.couponMessage = '';
  }
}