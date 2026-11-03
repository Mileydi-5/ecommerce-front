import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ProductService } from '../../../core/services/product';
import { CategoryService } from '../../../core/services/category';

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
  categoryService = inject(CategoryService);

  private id = Number(inject(ActivatedRoute).snapshot.paramMap.get('id')) || null;
  isEdit = this.id !== null;

  form = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    description: ['', Validators.required],
    price: [0, [Validators.required, Validators.min(0.01)]],
    stock: [0, [Validators.required, Validators.min(0)]],
    category: ['', Validators.required],
    subcategory: [''],
    tags: [''],
    imageUrl: ['images/camiseta.jpg', Validators.required],
    images: [''],
    sizes: [''],
    colors: [''],
  });

  private selectedCategory = toSignal(this.form.controls.category.valueChanges, { initialValue: '' });

  subcategoryOptions = computed(
    () => this.categoryService.categories().find((c) => c.name === this.selectedCategory())?.subcategories ?? []
  );

  constructor() {
    if (this.id !== null) {
      const p = this.productService.getById(this.id);
      if (p) {
        this.form.patchValue({
          ...p,
          subcategory: p.subcategory ?? '',
          tags: p.tags?.join(', ') ?? '',
          images: p.images?.join(', ') ?? '',
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
    const { sizes, colors, tags, images, subcategory, ...rest } = this.form.getRawValue();
    const data = {
      ...rest,
      subcategory: subcategory || undefined,
      tags: this.toList(tags),
      images: this.toList(images),
      sizes: this.toList(sizes),
      colors: this.toList(colors),
    };

    if (this.id !== null) {
      this.productService.update(this.id, data);
    } else {
      this.productService.create(data);
    }
    this.router.navigate(['/admin/productos']);
  }
}