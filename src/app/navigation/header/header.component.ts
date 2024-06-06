import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatBadgeModule } from '@angular/material/badge';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../authentication/auth.service';
import { ShoppingCartService } from '../../shared/services/shopping-cart.service';
import { Router, RouterModule } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  imports: [
    MatIconModule,
    MatToolbarModule,
    MatMenuModule,
    MatBadgeModule,
    CommonModule,
    MatButtonModule,
    RouterModule],
  styleUrls: ['./header.component.scss'],
  standalone: true,
})
export class HeaderComponent implements OnInit {
  @Output() sideNavToggle = new EventEmitter<void>();
  badge: number = 4;
  isAuth = true;


  constructor(
    private authService: AuthService,
    public shoppingCartService: ShoppingCartService,
    private router: Router
  ) { }

  ngOnInit() {
    this.badge = 4;
  }

  onToggleSideNav() {
    this.sideNavToggle.emit();
  }

  logout() {
    this.authService.signOut();
  }

  goToShoppingCart() {
    console.log('go to shopping cart');
  }

  navigateToShoppingCartPage() {
    this.router.navigate(['/shoppingCart']);
  }

}