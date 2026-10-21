import { Injectable, computed, signal } from '@angular/core';

export interface User {
  id: number;
  name: string;
  email: string;
  role: 'cliente' | 'administrador';
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // Usuarios de prueba (se reemplazan por el API más adelante)
  private users = [
    { id: 1, name: 'Cliente Demo', email: 'cliente@demo.com', password: '123456', role: 'cliente' as const },
    { id: 2, name: 'Admin Demo', email: 'admin@demo.com', password: 'admin123', role: 'administrador' as const },
  ];

  private _user = signal<User | null>(this.loadUser());

  user = this._user.asReadonly();
  isLoggedIn = computed(() => this._user() !== null);
  isAdmin = computed(() => this._user()?.role === 'administrador');

  login(email: string, password: string): boolean {
    const found = this.users.find((u) => u.email === email && u.password === password);
    if (!found) return false;

    const user: User = { id: found.id, name: found.name, email: found.email, role: found.role };
    this._user.set(user);
    localStorage.setItem('user', JSON.stringify(user));
    return true;
  }

  register(name: string, email: string, password: string, role: 'cliente' | 'administrador'): boolean {
    if (this.users.some((u) => u.email === email)) return false;

    this.users.push({ id: this.users.length + 1, name, email, password, role });
    return this.login(email, password);
  }

  logout() {
    this._user.set(null);
    localStorage.removeItem('user');
  }

  private loadUser(): User | null {
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : null;
  }
}