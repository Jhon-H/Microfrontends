import { HttpClient } from '@angular/common/http';
import { Component, signal } from '@angular/core';
import { CartService } from 'common';
import { MainLayoutComponent } from '../../../../common/src/lib/components/template/main-layout/main-layout.component';
import { RouterLink } from '@angular/router';

interface ProductBack {
  id: string;
  title: string;
  description: string;
  image: string;
  price: string;
}

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [MainLayoutComponent, RouterLink],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent {
  products = signal<ProductBack[]>([]);

  constructor(private _http: HttpClient, private _cartService: CartService) {
    this._http
      .get<ProductBack[]>('https://fakestoreapi.com/products')
      .subscribe((productsData) => {
        this.products.set(
          productsData.map((data) => ({
            id: data.id,
            title: data.title,
            description: data.description,
            image: data.image,
            price: data.price,
          }))
        );
      });
  }

  addProduct(item: ProductBack) {
    this._cartService.addItem({
      id: item.id,
      cant: 1,
      price: Number(item.price),
      title: item.title,
    });
  }
}
