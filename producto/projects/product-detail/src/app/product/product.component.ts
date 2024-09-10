import { HttpClient } from '@angular/common/http';
import { Component, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'common';
import { catchError, map, of, switchMap, tap, throwError } from 'rxjs';
import { MainLayoutComponent } from '../../../../common/src/lib/components/template/main-layout/main-layout.component';

interface ProductBack {
  id: string;
  title: string;
  description: string;
  image: string;
  price: string;
}

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [MainLayoutComponent],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
})
export class ProductComponent {
  product = signal<ProductBack | null>(null);

  constructor(
    private _http: HttpClient,
    private _cartService: CartService,
    private _activatesRoute: ActivatedRoute,
    private _router: Router
  ) {
    this._activatesRoute.params
      .pipe(
        switchMap(({ productId }) =>
          this._http.get<ProductBack>(
            `https://fakestoreapi.com/products/${productId}`
          )
        ),
        map((result) => {
          if (!result) throw new Error('notFound');
          return result;
        }),
        catchError((error) => {
          if (error.message === 'notFound') {
            this._router.navigate(['/404'], { skipLocationChange: true });
          }

          return of(null);
        })
      )
      .subscribe((productData) => {
        if (productData) this.product.set(productData);
      });
  }

  addProduct() {
    const item = this.product();
    if (!item) return;

    this._cartService.addItem({
      id: item.id,
      cant: 1,
      price: Number(item.price),
      title: item.title,
    });
  }
}
