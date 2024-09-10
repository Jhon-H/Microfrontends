import { Component, inject } from '@angular/core';
import { CartService, MainLayoutComponent } from 'common';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [MainLayoutComponent, AsyncPipe],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent {
  private readonly _cartService = inject(CartService);
  readonly items$ = this._cartService.getItemsLikeArray();
  readonly totalItems$ = this._cartService.getTotalPrice()
  readonly totalPrice$ = this._cartService.getTotalItems()
}
