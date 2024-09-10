import { Component, inject } from '@angular/core';
import { CartService } from '../../../cart/cart.service';
import { AsyncPipe, NgIf } from '@angular/common';
import { map } from 'rxjs';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'lib-header-common',
  standalone: true,
  imports: [AsyncPipe, NgIf, RouterLink],
  templateUrl: './header-common.component.html',
  styleUrl: './header-common.component.scss',
})
export class HeaderCommonComponent {
  private readonly _cartService = inject(CartService);

  readonly cartItems$ = this._cartService
    .getTotalItems()
    .pipe(map((val) => ({ total: val })));
}
