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
    } else {
      this.productService.getProductById(productId.toString()).subscribe((product: Product) => {
        debugger;
        var productState = this.productService.addOrReturnProduct(product);
        productState.quantity = quantity;
        items.push(productState);
      });
    }

    this.cartItemsSubject.next(items);
    this.updateTotalItems();
  }

  removeProduct(productId: number) {
    const items = this.cartItemsSubject.value;
    const existingItem = items.find(item => item.id === productId);

    if (existingItem) {
      existingItem.quantity -= 1;
      if (existingItem.quantity === 0) {
        items.splice(items.indexOf(existingItem), 1);
      }
    }

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
