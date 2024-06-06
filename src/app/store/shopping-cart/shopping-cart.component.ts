import { Component, OnDestroy, OnInit } from '@angular/core';
import { ShoppingCartService } from '../../shared/services/shopping-cart.service';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { Product } from '../../shared/models/product.model';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';


@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss'],
  standalone: true,
  imports: [MatCardModule, CommonModule, MatTableModule, MatButtonModule, MatIconModule]
})
export class ShoppingCartComponent implements OnInit, OnDestroy {
  cartItems: Product[] = [];
  displayedColumns: string[] = ['image', 'name', 'quantity', 'price', 'total', 'actions'];
  private destroy$ = new Subject<void>();

  constructor(
    private shoppingCartService: ShoppingCartService,
    private router: Router) { }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  getTotalPrice(): number {
    return this.cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }

  goBack() {
    this.router.navigate(['/']);
  }

  clearCart() {
    this.shoppingCartService.clearCart();
  }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.shoppingCartService.cartItems$
      .pipe(takeUntil(this.destroy$))
      .subscribe(items => {
        debugger;
        this.cartItems = items;
        if (this.cartItems.length === 0) {
          this.cartItems = [];
        }
      });
  }

  removeItem(productId: number) {
    this.shoppingCartService.removeProduct(productId);
  }

  checkout() {
    alert('Checkout not implemented yet');
  }
}
