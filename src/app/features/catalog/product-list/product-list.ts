import { Component, computed, inject, signal } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { ProductService } from '../../../core/services/product';
import { CategoryService } from '../../../core/services/category';

@Component({
  selector: 'app-product-list',
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './product-list.html',
  styleUrl: './product-list.scss',
})
export class ProductList {
  private productService = inject(ProductService);
  private router = inject(Router);
  categoryService = inject(CategoryService);

  search = signal('');
  category = signal('');
  onlyAvailable = signal(false);
  sort = signal<'none' | 'asc' | 'desc'>('none');
  showSuggestions = signal(false);

  // Quita mayúsculas y acentos para buscar sin importar cómo se escriba
  private normalize(text: string): string {
    return text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }

  filtered = computed(() => {
    const term = this.normalize(this.search());

    const list = this.productService.products().filter((p) => {
      const matchText =
        !term ||
        this.normalize(p.name).includes(term) ||
        this.normalize(p.description).includes(term);
      const matchCategory = !this.category() || p.category === this.category();
      const matchStock = !this.onlyAvailable() || p.stock > 0;
      return matchText && matchCategory && matchStock;
    });

    if (this.sort() === 'asc') return [...list].sort((a, b) => a.price - b.price);
    if (this.sort() === 'desc') return [...list].sort((a, b) => b.price - a.price);
    return list;
  });

  suggestions = computed(() => {
    const term = this.normalize(this.search());
    if (!term) return [];
    return this.productService
      .products()
      .filter((p) => this.normalize(p.name).includes(term))
      .slice(0, 5);
  });

  onSearch(event: Event) {
    this.search.set((event.target as HTMLInputElement).value);
    this.showSuggestions.set(true);
  }

  onSort(event: Event) {
    this.sort.set((event.target as HTMLSelectElement).value as 'none' | 'asc' | 'desc');
  }

  onAvailable(event: Event) {
    this.onlyAvailable.set((event.target as HTMLInputElement).checked);
  }

  goTo(id: number) {
    this.showSuggestions.set(false);
    this.router.navigate(['/productos', id]);
  }

  clearSearch() {
    this.search.set('');
    this.showSuggestions.set(false);
  }

  clearAll() {
    this.search.set('');
    this.category.set('');
    this.onlyAvailable.set(false);
    this.sort.set('none');
  }
}