import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../shared/services/product.service';
import { CLOTHES_SIZE, CLOTHES_TYPE, Product } from '../../shared/models/product.model';
import { MatCard, MatCardModule } from '@angular/material/card';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { ShoppingCartService } from '../../shared/services/shopping-cart.service';
import { ToastrService } from 'ngx-toastr';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { StarRatingComponent } from '../star-rating/star-rating.component';
import { RatingComponent } from '../product-rating/product-rating.component';

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
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    StarRatingComponent,
    RatingComponent
  ]
})
export class ProductDetailComponent implements OnInit {
  item: Product;
  rateCommentForm: FormGroup;
  ratings: number[] = [1, 2, 3, 4, 5];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private shoppingCartService: ShoppingCartService,
    private toastr: ToastrService,
    private fb: FormBuilder,
  ) {
    this.rateCommentForm = this.fb.group({
      rating: [''],
      comment: ['']
    });

  }

  ngOnInit(): void {
    const itemId = this.route.snapshot.paramMap.get('id');
    this.productService.getProductById(itemId).subscribe((product: Product) => {
      this.item = product;
    });
  }

  onSubmit(): void {
    const formValue = this.rateCommentForm.value
  }

  goBack(): void {
    this.router.navigate(['/']);
  }

  getClothesTypeLabel(type: CLOTHES_TYPE): string {
    return this.productService.getClothesTypeLabel(type);
  }

  getSizeTypeLabel(size: CLOTHES_SIZE): string {
    return this.productService.getClothesSizeLabel(size);
  }

  addToCart(product: Product) {
    this.shoppingCartService.addProduct(product.id, 1);
    this.toastr.success('Product added to cart', 'Success', {
      positionClass: 'toast-bottom-right'
    });
  }
}
