import { Component, inject } from '@angular/core';
import { AuthService, Role } from '../../../core/services/auth';

@Component({
  selector: 'app-user-admin',
  imports: [],
  templateUrl: './user-admin.html',
  styleUrl: './user-admin.scss',
})
export class UserAdmin {
  auth = inject(AuthService);

  changeRole(id: number, event: Event) {
    const role = (event.target as HTMLSelectElement).value as Role;
    this.auth.changeRole(id, role);
  }

  remove(id: number, name: string) {
    if (confirm(`¿Eliminar al usuario "${name}"?`)) {
      this.auth.deleteUser(id);
    }
  }

  isMe(id: number): boolean {
    return this.auth.user()?.id === id;
  }
}