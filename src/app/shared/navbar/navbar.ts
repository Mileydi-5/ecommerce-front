import { Component, computed, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CartService } from '../../core/services/cart';
import { AuthService } from '../../core/services/auth';
import { OrderService } from '../../core/services/order';

@Component({
  imports: [RouterLink],
  selector: 'app-navbar',
  styleUrl: './navbar.scss',
  templateUrl: './navbar.html',
})
export class Navbar {
  cart = inject(CartService);
  auth = inject(AuthService);
  private orderService = inject(OrderService);
  private router = inject(Router);

  // Cantidad de pedidos del usuario con un cambio de estado que aún no ha visto
  unseen = computed(() => {
    const user = this.auth.user();
    if (!user) return 0;
    return this.orderService
      .orders()
      .filter((o) => o.userEmail === user.email && o.status !== o.seenStatus).length;
  });

  logout() {
    this.auth.logout();
    this.router.navigate(['/productos']);
  }
}