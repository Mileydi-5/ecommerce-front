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

  changeQuantity(productId: number, event: Event) {
    const value = Number((event.target as HTMLInputElement).value);
    this.cart.setQuantity(productId, value);
  }
}