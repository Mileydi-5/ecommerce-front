import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CategoryService } from '../../../core/services/category';

@Component({
  selector: 'app-category-admin',
  imports: [ReactiveFormsModule],
  templateUrl: './category-admin.html',
  styleUrl: './category-admin.scss',
})
export class CategoryAdmin {
  private fb = inject(FormBuilder);
  categoryService = inject(CategoryService);

  editingId = signal<number | null>(null);

  form = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
  });

  save() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const { name } = this.form.getRawValue();
    const id = this.editingId();

    if (id !== null) {
      this.categoryService.update(id, name);
    } else {
      this.categoryService.create(name);
    }
    this.cancel();
  }

  edit(id: number, name: string) {
    this.editingId.set(id);
    this.form.setValue({ name });
  }

  cancel() {
    this.editingId.set(null);
    this.form.reset({ name: '' });
  }

  remove(id: number, name: string) {
    if (confirm(`¿Eliminar la categoría "${name}"?`)) {
      this.categoryService.delete(id);
    }
  }
}