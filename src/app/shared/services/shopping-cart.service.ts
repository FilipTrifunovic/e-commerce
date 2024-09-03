import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../models/product.model';
import { ProductService } from './product.service';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  private cartItemsSubject = new BehaviorSubject<Product[]>([]);
  private totalItemsSubject = new BehaviorSubject<number>(0);

  cartItems$ = this.cartItemsSubject.asObservable();
  totalItems$ = this.totalItemsSubject.asObservable();

  constructor(private productService: ProductService) { }

  addProduct(productId: number, quantity: number) {
    const items = this.cartItemsSubject.value;
    const existingItem = items.find(item => item.id === productId);

    if (existingItem) {
      existingItem.quantity += quantity;
      this.updateTotalItems();
    } else {
      this.productService.getProductById(productId.toString()).subscribe((product: Product) => {
        var productState = this.productService.addOrReturnProduct(product);
        productState.quantity = quantity;
        items.push(productState);
        this.cartItemsSubject.next(items);
        this.updateTotalItems();
      });
    }
  }

  removeProduct(productId: number) {
    // Get the current items
    const items = [...this.cartItemsSubject.value]; // Create a shallow copy of the array
    const existingItemIndex = items.findIndex(item => item.id === productId);

    // Check if the item exists in the cart
    if (existingItemIndex > -1) {
      const existingItem = items[existingItemIndex];
      existingItem.quantity -= 1;

      // If the quantity is zero, remove the item from the array
      if (existingItem.quantity === 0) {
        items.splice(existingItemIndex, 1);
      } else {
        // Update the modified item in the copied array
        items[existingItemIndex] = existingItem;
      }
    }

    // Update the cart items with a new reference
    this.cartItemsSubject.next(items);
    this.updateTotalItems();
  }


  getTotalItems(): Observable<number> {
    return this.totalItems$;
  }

  getCartItems(): Product[] {
    return this.cartItemsSubject.value;
  }

  clearCart() {
    this.cartItemsSubject.next([]);
    this.updateTotalItems();
  }

  private updateTotalItems() {
    const totalItems = this.cartItemsSubject.value.reduce((total, product) => total + product.quantity, 0);
    this.totalItemsSubject.next(totalItems);
  }
}
