import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth';

interface SavedAddress {
  label: string;
  address: string;
  city: string;
  department: string;
}

interface SavedPayment {
  type: string;
  detail: string;
}

@Component({
  selector: 'app-profile',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './profile.html',
  styleUrl: './profile.scss',
})
export class Profile {
  private fb = inject(FormBuilder);
  auth = inject(AuthService);

  tab = signal<'datos' | 'direcciones' | 'pagos'>('datos');

  addresses = signal<SavedAddress[]>([]);
  payments = signal<SavedPayment[]>([]);

  addressForm = this.fb.nonNullable.group({
    label: ['', Validators.required],
    address: ['', [Validators.required, Validators.minLength(5)]],
    city: ['', Validators.required],
    department: ['', Validators.required],
  });

  paymentForm = this.fb.nonNullable.group({
    type: ['tarjeta', Validators.required],
    detail: ['', [Validators.required, Validators.minLength(4)]],
  });

  addAddress() {
    if (this.addressForm.invalid) {
      this.addressForm.markAllAsTouched();
      return;
    }
    this.addresses.set([...this.addresses(), this.addressForm.getRawValue()]);
    this.addressForm.reset();
  }

  removeAddress(index: number) {
    this.addresses.set(this.addresses().filter((_, i) => i !== index));
  }

  addPayment() {
    if (this.paymentForm.invalid) {
      this.paymentForm.markAllAsTouched();
      return;
    }
    this.payments.set([...this.payments(), this.paymentForm.getRawValue()]);
    this.paymentForm.reset({ type: 'tarjeta', detail: '' });
  }

  removePayment(index: number) {
    this.payments.set(this.payments().filter((_, i) => i !== index));
  }
}