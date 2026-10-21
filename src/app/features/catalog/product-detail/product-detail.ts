import { Component, inject } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductService } from '../../../core/services/product';
import { CartService } from '../../../core/services/cart';

@Component({
  selector: 'app-product-detail',
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.scss',
})
export class ProductDetail {
  private route = inject(ActivatedRoute);
  private productService = inject(ProductService);
  private cart = inject(CartService);

  product = this.productService.getById(Number(this.route.snapshot.paramMap.get('id')));
  added = false;

  addToCart() {
    if (this.product) {
      this.cart.add(this.product);
      this.added = true;
    }
  }
}