import { Injectable, signal } from '@angular/core';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private _products = signal<Product[]>([
    {
      id: 1,
      name: 'Camiseta básica',
      description: 'Camiseta de algodón, cómoda y fresca.',
      price: 89.9,
      imageUrl: 'images/camiseta.jpg',
      category: 'Ropa',
      stock: 25,
      sizes: ['S', 'M', 'L', 'XL'],
      colors: ['Blanco', 'Negro', 'Azul'],
    },
    {
      id: 2,
      name: 'Audífonos Bluetooth',
      description: 'Audífonos inalámbricos con 20 horas de batería.',
      price: 249.0,
      imageUrl: 'images/audifonos.jpg',
      category: 'Electrónica',
      stock: 10,
    },
    {
      id: 3,
      name: 'Mochila urbana',
      description: 'Mochila resistente con espacio para laptop.',
      price: 179.5,
      imageUrl: 'images/mochila.jpg',
      category: 'Accesorios',
      stock: 0,
      colors: ['Negro', 'Gris'],
    },
  ]);

  products = this._products.asReadonly();

  getAll(): Product[] {
    return this._products();
  }

  getById(id: number): Product | undefined {
    return this._products().find((p) => p.id === id);
  }

  create(data: Omit<Product, 'id'>): Product {
    const nextId = Math.max(0, ...this._products().map((p) => p.id)) + 1;
    const product: Product = { ...data, id: nextId };
    this._products.set([...this._products(), product]);
    return product;
  }

  update(id: number, data: Omit<Product, 'id'>) {
    this._products.set(this._products().map((p) => (p.id === id ? { ...data, id } : p)));
  }

  delete(id: number) {
    this._products.set(this._products().filter((p) => p.id !== id));
  }
}