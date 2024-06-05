import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../../shared/services/shopping-cart.service';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { Product } from '../../shared/models/product.model';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';


@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss'],
  standalone: true,
  imports: [MatCardModule, CommonModule, MatTableModule, MatButtonModule, MatIconModule]
})
export class ShoppingCartComponent implements OnInit {
  totalItems: number = 0;
  cartItems: Product[] = [];
  displayedColumns: string[] = ['image', 'name', 'quantity', 'price', 'total', 'actions'];

  constructor(
    private shoppingCartService: ShoppingCartService,
    private router: Router) { }
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
    this.shoppingCartService.cartItems$.subscribe(items => {
      this.totalItems = this.shoppingCartService.getTotalItems();
    });

    this.getProducts();
  }

  removeFromCart(productId: number) {
    this.shoppingCartService.removeProduct(productId);
  }

  getProducts() {
    this.shoppingCartService.cartItems$.subscribe(items => {
      this.cartItems = items;
    });
  }

  removeItem(productId: number) {
    this.shoppingCartService.removeProduct(productId);
  }

  checkout() {
    alert('Checkout not implemented yet');
  }
}
