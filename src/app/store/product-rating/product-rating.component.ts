import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ProductService } from '../../shared/services/product.sevice';
import { Product, Review } from '../../shared/models/product.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-rating',
  templateUrl: './product-rating.component.html',
  styleUrls: ['./product-rating.component.scss'],
  standalone: true,
  imports: [
    MatIconModule,
    CommonModule,
    MatCardModule,
    MatTooltipModule,
    MatFormFieldModule,
    FormsModule,
    MatButtonModule,
    MatInputModule]
})
export class RatingComponent {
  @Input() product: Product;
  rating = 0;
  hoverRating = 0;
  stars = [1, 2, 3, 4, 5];
  comment = '';
  comments: string[] = [];

  /**
   *
   */
  constructor(
    private productService: ProductService,
    private toastr: ToastrService,) { }

  rateProduct(rating: number): void {
    this.rating = rating;
  }

  hoverRate(rating: number): void {
    this.hoverRating = rating;
  }

  submitComment(): void {
    if (this.comment) {
      this.comments.push(this.comment);
      const newReview: Review = {
        comment: this.comment,
        rating: this.rating,
        date: new Date()
      };
      this.productService.addReview(this.product.id, newReview);
      this.toastr.success('Review added', 'Success', {
        positionClass: 'toast-bottom-right'
      });
      this.resetForm();
    }
  }

  resetForm() {
    this.comment = '';
    this.rating = 0;
  }
}
