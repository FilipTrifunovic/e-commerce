import { Component, OnInit } from '@angular/core';
import { ProductService } from '../shared/services/product.service';
import { CLOTHES_SIZE, CLOTHES_TYPE, Product } from '../shared/models/product.model';
import { MatCardModule } from '@angular/material/card';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { ShoppingCartService } from '../shared/services/shopping-cart.service';
import { ToastrService } from 'ngx-toastr';
import { MatSidenavModule } from '@angular/material/sidenav';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [
    MatCardModule,
    HttpClientModule,
    CommonModule,
    MatButtonModule,
    MatSidenavModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    RouterModule],
  standalone: true,
})
export class HomeComponent implements OnInit {
  searchForm: FormGroup;
  products: Product[] = [];
  clothesTypes = Object.values(CLOTHES_TYPE);
  sizes = Object.values(CLOTHES_SIZE);
  constructor(
    private productService: ProductService,
    private shoppingCartService: ShoppingCartService,
    private toastr: ToastrService,
    private fb: FormBuilder) {
    this.searchForm = this.fb.group({
      title: [''],
      priceFrom: [''],
      priceTo: [''],
      type: [''],
      size: [''],
      manufacturer: ['']
    });
  }

  filteredProducts: Product[] = [];

  ngOnInit() {
    this.getProducts();
    this.getSearchFilter();
  }

  applyFilters(): void {
    const { title, priceFrom, priceTo, type, size, manufacturer } = this.searchForm.value;

    this.filteredProducts = this.products.filter(product => {
      return (
        (!title || product.title.toLowerCase().includes(title.toLowerCase())) &&
        (!priceFrom || product.price >= priceFrom) &&
        (!priceTo || product.price <= priceTo) &&
        (!type || product.type === type) &&
        (!size || product.size === size) &&
        (!manufacturer || product.manufacturer === manufacturer)
      );
    });
  }

  clearFilters(): void {
    this.searchForm.reset();
    this.filteredProducts = this.products;
  }

  getProducts() {
    this.productService.getProductList().
      subscribe(
        (products) => {
          this.products = products;
        }
      )
  }

  getSearchFilter() {
    this.productService.currentSearchCriteria.subscribe(criteria => {
      if (criteria !== null && criteria.trim().length > 0)
        this.filterProducts(criteria);
    });
    this.filteredProducts = this.products;
  }

  filterProducts(criteria: any) {
    this.filteredProducts = this.products.filter(product =>
      product.size.toLowerCase().includes(criteria.size.toLowerCase()) ||
      product.dateCreated == criteria.dateCreated ||
      (product.price >= criteria.minPrice && product.price <= criteria.maxPrice) ||
      product.type.toLowerCase().includes(criteria.type.toLowerCase())
    );
  }

  addToCart(product: Product) {
    this.shoppingCartService.addProduct(product.id, 1);
    this.toastr.success('Product added to cart', 'Success', {
      positionClass: 'toast-bottom-right'
    });
  }

}

