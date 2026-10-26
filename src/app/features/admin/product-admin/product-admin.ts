import { Component, inject } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProductService } from '../../../core/services/product';

@Component({
  selector: 'app-product-admin',
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './product-admin.html',
  styleUrl: './product-admin.scss',
})
export class ProductAdmin {
  productService = inject(ProductService);

  remove(id: number, name: string) {
    if (confirm(`¿Eliminar "${name}"?`)) {
      this.productService.delete(id);
    }
  }
}