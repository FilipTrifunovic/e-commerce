import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { CLOSE_SIZE, CLOTHES_TYPE, Product } from "../models/product.model";

import { map, pluck, flatMap, catchError } from 'rxjs/operators';
import { BehaviorSubject, Observable, from, of, throwError } from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private searchCriteria = new BehaviorSubject<string>('');
  currentSearchCriteria = this.searchCriteria.asObservable();

  products: Product[] = [
    {
      id: 1,
      title: "Haljina",
      description: "Duga haljina sa cvetnim dezenom.",
      price: 3.99,
      image: "assets/images/haljina.jpg",
      text: "Prolecna haljina.",
      type: CLOTHES_TYPE.FASHION,
      size: CLOSE_SIZE.S,
      manufacturer: "H&M",
      dateCreated: new Date(),
      quantity: 3
    },
    {
      id: 2,
      title: "Majica",
      description: "Kratka majica sa modernim printom.",
      price: 2.49,
      image: "assets/images/muska-majica.jpg",
      text: "Letnja majica.",
      type: CLOTHES_TYPE.CASUAL,
      size: CLOSE_SIZE.M,
      manufacturer: "Zara",
      dateCreated: new Date(),
      quantity: 5
    },
    {
      id: 3,
      title: "Pantalone",
      description: "Elegantne pantalone za sve prilike.",
      price: 4.99,
      image: "assets/images/pantalone.jpg",
      text: "Jesenje pantalone.",
      type: CLOTHES_TYPE.FORMAL,
      size: CLOSE_SIZE.L,
      manufacturer: "Gucci",
      dateCreated: new Date(),
      quantity: 3
    },
    {
      id: 4,
      title: "Suknja",
      description: "Kratka suknja sa kariranim dezenom.",
      price: 3.49,
      image: "assets/images/suknja.jpg",
      text: "Letnja suknja.",
      type: CLOTHES_TYPE.FASHION,
      size: CLOSE_SIZE.M,
      manufacturer: "H&M",
      dateCreated: new Date(),
      quantity: 6
    },
    {
      id: 5,
      title: "Jakna",
      description: "Topla jakna za zimu.",
      price: 8.99,
      image: "assets/images/jakna.jpg",
      text: "Zimska jakna.",
      type: CLOTHES_TYPE.OUTERWEAR,
      size: CLOSE_SIZE.L,
      manufacturer: "North Face",
      dateCreated: new Date(),
      quantity: 4
    },
    {
      id: 6,
      title: "Cipele",
      description: "Kožne cipele za elegantne prilike.",
      price: 7.99,
      image: "assets/images/cipele.jpg",
      text: "Elegantne cipele.",
      type: CLOTHES_TYPE.FORMAL,
      size: CLOSE_SIZE.M,
      manufacturer: "Prada",
      dateCreated: new Date(),
      quantity: 7
    },
    {
      id: 7,
      title: "Sandale",
      description: "Lagan sandale za leto.",
      price: 2.99,
      image: "assets/images/sandale.jpg",
      text: "Letnje sandale.",
      type: CLOTHES_TYPE.CASUAL,
      size: CLOSE_SIZE.S,
      manufacturer: "Zara",
      dateCreated: new Date(),
      quantity: 5
    },
    {
      id: 8,
      title: "Kaput",
      description: "Elegantan kaput za proleće.",
      price: 9.99,
      image: "assets/images/kaput.jpg",
      text: "Prolecni kaput.",
      type: CLOTHES_TYPE.OUTERWEAR,
      size: CLOSE_SIZE.L,
      manufacturer: "Burberry",
      dateCreated: new Date(),
      quantity: 3
    },
    {
      id: 9,
      title: "Šorts",
      description: "Kratki šorts za sport.",
      price: 3.29,
      image: "assets/images/sorts.jpg",
      text: "Sportski šorts.",
      type: CLOTHES_TYPE.SPORTS,
      size: CLOSE_SIZE.M,
      manufacturer: "Nike",
      dateCreated: new Date(),
      quantity: 4
    },
    {
      id: 10,
      title: "Haljina",
      description: "Kratka haljina sa prugama.",
      price: 4.19,
      image: "assets/images/haljina2.jpg",
      text: "Letnja haljina.",
      type: CLOTHES_TYPE.FASHION,
      size: CLOSE_SIZE.S,
      manufacturer: "Zara",
      dateCreated: new Date(),
      quantity: 2
    },
    {
      id: 11,
      title: "Pulover",
      description: "Udoban pulover za jesen.",
      price: 5.49,
      image: "assets/images/pulover.jpg",
      text: "Jesenji pulover.",
      type: CLOTHES_TYPE.CASUAL,
      size: CLOSE_SIZE.M,
      manufacturer: "H&M",
      dateCreated: new Date(),
      quantity: 4
    }
  ];


  constructor() {
  }

  changeSearchCriteria(criteria: string) {
    this.searchCriteria.next(criteria);
  }

  getProductList(): Observable<Product[]> {
    return from([this.products]);
  }

  getProductById(id: number): Observable<Product> {
    return from([this.products.find(product => product.id === id)]);
  }

} 
