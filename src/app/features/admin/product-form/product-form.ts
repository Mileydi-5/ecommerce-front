import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ProductService } from '../../../core/services/product';

@Component({
  selector: 'app-product-form',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './product-form.html',
  styleUrl: './product-form.scss',
})
export class ProductForm {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private productService = inject(ProductService);

  private id = Number(inject(ActivatedRoute).snapshot.paramMap.get('id')) || null;
  isEdit = this.id !== null;

  form = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    description: ['', Validators.required],
    price: [0, [Validators.required, Validators.min(0.01)]],
    stock: [0, [Validators.required, Validators.min(0)]],
    category: ['', Validators.required],
    imageUrl: ['images/camiseta.jpg', Validators.required],
    sizes: [''],
    colors: [''],
  });

  constructor() {
    if (this.id !== null) {
      const p = this.productService.getById(this.id);
      if (p) {
        this.form.patchValue({
          ...p,
          sizes: p.sizes?.join(', ') ?? '',
          colors: p.colors?.join(', ') ?? '',
        });
      } else {
        this.router.navigate(['/admin/productos']);
      }
    }
  }

  private toList(text: string): string[] | undefined {
    const list = text.split(',').map((s) => s.trim()).filter((s) => s);
    return list.length ? list : undefined;
  }

  save() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const { sizes, colors, ...rest } = this.form.getRawValue();
    const data = { ...rest, sizes: this.toList(sizes), colors: this.toList(colors) };

    if (this.id !== null) {
      this.productService.update(this.id, data);
    } else {
      this.productService.create(data);
    }
    this.router.navigate(['/admin/productos']);
  }
}