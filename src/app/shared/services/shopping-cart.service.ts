import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  private cartItemsSubject = new BehaviorSubject<Product[]>([]);
  cartItems$ = this.cartItemsSubject.asObservable();

  addProduct(product: Product) {
    const items = this.cartItemsSubject.value;
    const existingItem = items.find(item => item.id === product.id);

    if (existingItem) {
      existingItem.quantity += product.quantity;
    } else {
      items.push(product);
    }

    this.cartItemsSubject.next(items);
  }

  removeProduct(productId: number) {
    debugger;
    const items = this.cartItemsSubject.value;
    const existingItem = items.find(item => item.id === productId);

    if (existingItem) {
      existingItem.quantity -= 1;
      if (existingItem.quantity === 0) {
        items.splice(items.indexOf(existingItem), 1);
        return this.cartItemsSubject.next([...items]);
      }
    }

    this.cartItemsSubject.next(items);
  }

  getTotalItems(): number {
    return this.cartItemsSubject.value.reduce((total, product) => total + product.quantity, 0);
  }

  getCartItems(): Product[] {
    return this.cartItemsSubject.value;
  }

  clearCart() {
    this.cartItemsSubject.next([]);
  }
}
