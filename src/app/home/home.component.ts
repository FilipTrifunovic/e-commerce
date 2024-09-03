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
import { ApiService } from '../shared/services/api.service';
import { Filters } from './models/filters';

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
    private fb: FormBuilder,
    private apiService: ApiService) {
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
  }

  applyFilters(): void {
    this.getProducts();
  }

  clearFilters(): void {
    this.searchForm.reset();
    this.filteredProducts = this.products;
  }

  private getFormValueOrNull(value: any): any {
    return value ? value : null;
  }


  getProducts() {
    const filters: Filters = {
      title: this.getFormValueOrNull(this.searchForm.value.title),
      priceFrom: this.getFormValueOrNull(this.searchForm.value.priceFrom),
      priceTo: this.getFormValueOrNull(this.searchForm.value.priceTo),
      clothesType: this.getFormValueOrNull(this.searchForm.value.type),
      size: this.getFormValueOrNull(this.searchForm.value.size),
      manufacturer: this.getFormValueOrNull(this.searchForm.value.manufacturer)
    };

    this.productService.getProductList(filters)
      .subscribe(
        (products) => {
          this.products = products;
          this.filteredProducts = this.products;
        }
      )
  }



  addToCart(product: Product) {
    this.shoppingCartService.addProduct(product.id, 1);
    this.toastr.success('Product added to cart', 'Success', {
      positionClass: 'toast-bottom-right'
    });
  }

}

