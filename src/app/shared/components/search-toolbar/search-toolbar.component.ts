import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { CLOSE_SIZE, CLOTHES_TYPE } from '../../models/product.model';
import { ProductService } from '../../services/product.sevice';

@Component({
  selector: 'app-search-toolbar',
  templateUrl: './search-toolbar.component.html',
  styleUrls: ['./search-toolbar.component.scss'],
  imports: [ReactiveFormsModule, CommonModule, MatButtonModule, MatIconModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatDatepickerModule, MatNativeDateModule, MatToolbarModule, MatCardModule],
  standalone: true,
  animations: [
    trigger('slideInOut', [
      state('in', style({
        height: '*',
        opacity: 1
      })),
      state('out', style({
        height: '0px',
        opacity: 0
      })),
      transition('in <=> out', [
        animate('300ms ease-in-out')
      ])
    ])
  ]
})
export class SearchToolbarComponent {
  isExpanded = false;
  clothesTypes = Object.values(CLOTHES_TYPE);
  sizes = Object.values(CLOSE_SIZE);

  searchForm: FormGroup;

  toggleSearchBar() {
    this.isExpanded = !this.isExpanded;
  }

  constructor(
    private fb: FormBuilder,
    private productService: ProductService) {
    this.searchForm = this.fb.group({
      minPrice: [''],
      maxPrice: [''],
      dateCreated: [''],
      type: [''],
      state: [''],
      size: ['']
    });
  }

  onSearch() {
    debugger;
    this.productService.changeSearchCriteria(this.searchForm.value)
  }
}
