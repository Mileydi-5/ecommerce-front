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
  ];

  getAll(): Product[] {
    return this.products;
  }

  getById(id: number): Product | undefined {
    return this.products.find((p) => p.id === id);
  }
}