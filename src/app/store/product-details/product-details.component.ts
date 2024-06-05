import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../shared/services/product.sevice';
import { Product } from '../../shared/models/product.model';
import { MatCard, MatCardModule } from '@angular/material/card';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { ShoppingCartService } from '../../shared/services/shopping-cart.service';
import { ToastrService } from 'ngx-toastr';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-item-detail',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
  standalone: true,
  imports: [
    MatCardModule,
    DatePipe,
    CurrencyPipe,
    CommonModule,
    MatButtonModule]
})
export class ProductDetailComponent implements OnInit {
  item: Product;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private shoppingCartService: ShoppingCartService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    const itemId = this.route.snapshot.paramMap.get('id');
    this.productService.getProductById(+itemId).subscribe(item => this.item = item);
  }

  addToCart(product: Product) {
    this.shoppingCartService.addProduct({ ...product, quantity: 1 });
    this.toastr.success('Product added to cart', 'Success', {
      positionClass: 'toast-bottom-right'
    });
  }
}
