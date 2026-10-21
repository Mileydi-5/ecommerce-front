import { Injectable } from '@angular/core';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private products: Product[] = [
    {
      id: 1,
      name: 'Camiseta básica',
      description: 'Camiseta de algodón, cómoda y fresca.',
      price: 89.9,
      imageUrl: 'https://picsum.photos/seed/camiseta/400/300',
      category: 'Ropa',
      stock: 25,
    },
    {
      id: 2,
      name: 'Audífonos Bluetooth',
      description: 'Audífonos inalámbricos con 20 horas de batería.',
      price: 249.0,
      imageUrl: 'https://picsum.photos/seed/audifonos/400/300',
      category: 'Electrónica',
      stock: 10,
    },
    {
      id: 3,
      name: 'Mochila urbana',
      description: 'Mochila resistente con espacio para laptop.',
      price: 179.5,
      imageUrl: 'https://picsum.photos/seed/mochila/400/300',
      category: 'Accesorios',
      stock: 0,
    },
  ];

  getAll(): Product[] {
    return this.products;
  }
}