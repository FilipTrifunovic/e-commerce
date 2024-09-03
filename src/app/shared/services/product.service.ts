import { Injectable } from "@angular/core";
import { CLOTHES_SIZE, CLOTHES_TYPE, Product, Review } from "../models/product.model";

import { BehaviorSubject, Observable, from, tap } from "rxjs";
import { ApiService } from "./api.service";


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  /**
   *
   */
  private searchCriteria = new BehaviorSubject<string>('');
  currentSearchCriteria = this.searchCriteria.asObservable();

  products: Product[] = [];

  constructor(private apiService: ApiService) {
  }

  addReview(productId: number, review: Review) {
    const product = this.products.find(product => product.id === productId);
    product.reviews.push(review);
  }

  changeSearchCriteria(criteria: string) {
    this.searchCriteria.next(criteria);
  }

  getProductList(filters: any): Observable<Product[]> {
    return this.apiService.post<Product[]>('products', { filters })
      .pipe(
        tap(products => this.products = products)
      );
  }

  addOrReturnProduct(productResult: Product) {
    var product = this.products.find(product => product.id === productResult.id);
    if (!product) {
      this.products.push(productResult);
    }

    return productResult;
  }

  getProductById(id: string): Observable<Product> {
    return this.apiService.get<Product>(`products/${id}`);
  }

} 
