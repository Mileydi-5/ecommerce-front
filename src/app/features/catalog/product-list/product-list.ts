import { Component, inject } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { ProductService } from '../../../core/services/product';

@Component({
  selector: 'app-product-list',
  imports: [CurrencyPipe],
  templateUrl: './product-list.html',
  styleUrl: './product-list.scss',
})
export class ProductList {
  private productService = inject(ProductService);
  products = this.productService.getAll();
}