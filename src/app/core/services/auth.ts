import { Injectable, computed, signal } from '@angular/core';

export type Role = 'cliente' | 'administrador';

export interface User {
  id: number;
  name: string;
  email: string;
  role: Role;
}

interface StoredUser extends User {
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // Usuarios de prueba (se reemplazan por el API más adelante)
  private _users = signal<StoredUser[]>([
    { id: 1, name: 'Cliente Demo', email: 'cliente@demo.com', password: '123456', role: 'cliente' },
    { id: 2, name: 'Admin Demo', email: 'admin@demo.com', password: 'admin123', role: 'administrador' },
  ]);

  // Lista pública sin contraseñas, para el panel de administración
  users = computed<User[]>(() =>
    this._users().map(({ password, ...user }) => user)
  );

  private _user = signal<User | null>(this.loadUser());

  user = this._user.asReadonly();
  isLoggedIn = computed(() => this._user() !== null);
  isAdmin = computed(() => this._user()?.role === 'administrador');

  login(email: string, password: string): boolean {
    const found = this._users().find((u) => u.email === email && u.password === password);
    if (!found) return false;

    const user: User = { id: found.id, name: found.name, email: found.email, role: found.role };
    this._user.set(user);
    localStorage.setItem('user', JSON.stringify(user));
    return true;
  }

  register(name: string, email: string, password: string, role: Role): boolean {
    if (this._users().some((u) => u.email === email)) return false;

    const nextId = Math.max(0, ...this._users().map((u) => u.id)) + 1;
    this._users.set([...this._users(), { id: nextId, name, email, password, role }]);
    return this.login(email, password);
  }

  logout() {
    this._user.set(null);
    localStorage.removeItem('user');
  }

  changeRole(id: number, role: Role) {
    this._users.set(this._users().map((u) => (u.id === id ? { ...u, role } : u)));
  }

  deleteUser(id: number) {
    this._users.set(this._users().filter((u) => u.id !== id));
  }

  private loadUser(): User | null {
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : null;
  }
}