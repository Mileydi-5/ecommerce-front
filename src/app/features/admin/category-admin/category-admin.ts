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
    subcategories: [''],
  });

  private toList(text: string): string[] {
    return text.split(',').map((s) => s.trim()).filter((s) => s);
  }

  save() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const { name, subcategories } = this.form.getRawValue();
    const list = this.toList(subcategories);
    const id = this.editingId();

    if (id !== null) {
      this.categoryService.update(id, name, list);
    } else {
      this.categoryService.create(name, list);
    }
    this.cancel();
  }

  edit(id: number, name: string, subcategories: string[]) {
    this.editingId.set(id);
    this.form.setValue({ name, subcategories: subcategories.join(', ') });
  }

  cancel() {
    this.editingId.set(null);
    this.form.reset({ name: '', subcategories: '' });
  }

  remove(id: number, name: string) {
    if (confirm(`¿Eliminar la categoría "${name}"?`)) {
      this.categoryService.delete(id);
    }
  }
}