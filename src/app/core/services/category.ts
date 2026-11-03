import { Injectable, signal } from '@angular/core';

export interface Category {
  id: number;
  name: string;
  subcategories: string[];
}

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private _categories = signal<Category[]>([
    { id: 1, name: 'Ropa', subcategories: ['Camisetas', 'Pantalones'] },
    { id: 2, name: 'Electrónica', subcategories: ['Audio', 'Computación'] },
    { id: 3, name: 'Accesorios', subcategories: ['Bolsos', 'Gorras'] },
  ]);

  categories = this._categories.asReadonly();

  create(name: string, subcategories: string[]) {
    const nextId = Math.max(0, ...this._categories().map((c) => c.id)) + 1;
    this._categories.set([...this._categories(), { id: nextId, name, subcategories }]);
  }

  update(id: number, name: string, subcategories: string[]) {
    this._categories.set(
      this._categories().map((c) => (c.id === id ? { ...c, name, subcategories } : c))
    );
  }

  delete(id: number) {
    this._categories.set(this._categories().filter((c) => c.id !== id));
  }
}