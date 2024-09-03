import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatBadgeModule } from '@angular/material/badge';
import { AsyncPipe, CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../authentication/services/auth.service';
import { ShoppingCartService } from '../../shared/services/shopping-cart.service';
import { Router, RouterModule } from '@angular/router';
import { Observable } from 'rxjs';


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
    RouterModule,
    AsyncPipe],
  styleUrls: ['./header.component.scss'],
  standalone: true,
})
export class HeaderComponent implements OnInit {
  @Output() sideNavToggle = new EventEmitter<void>();
  totalItems$: Observable<number>;


  constructor(
    public authService: AuthService,
    public shoppingCartService: ShoppingCartService,
    private router: Router
  ) { }

  ngOnInit() {
    this.totalItems$ = this.shoppingCartService.getTotalItems();
  }

  onToggleSideNav() {
    this.sideNavToggle.emit();
  }

  logout() {
    this.authService.signOut();
  }

  goToShoppingCart() { }

  navigateToShoppingCartPage() {
    this.router.navigate(['/shoppingCart']);
  }

}
