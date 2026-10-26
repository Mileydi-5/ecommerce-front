import { Injectable, signal } from '@angular/core';

export interface Category {
  id: number;
  name: string;
}

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private _categories = signal<Category[]>([
    { id: 1, name: 'Ropa' },
    { id: 2, name: 'Electrónica' },
    { id: 3, name: 'Accesorios' },
  ]);

  categories = this._categories.asReadonly();

  create(name: string) {
    const nextId = Math.max(0, ...this._categories().map((c) => c.id)) + 1;
    this._categories.set([...this._categories(), { id: nextId, name }]);
  }

  update(id: number, name: string) {
    this._categories.set(this._categories().map((c) => (c.id === id ? { ...c, name } : c)));
  }

  delete(id: number) {
    this._categories.set(this._categories().filter((c) => c.id !== id));
  }
}