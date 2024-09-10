import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';

interface Item {
  id: string;
  title: string;
  price: number;
  cant: number;
}
@Injectable({ providedIn: 'root' })
export class CartService {
  readonly cart = new BehaviorSubject<{ [id: string]: Item }>({});

  addItem(item: Item) {
    const currentCart = this.cart.getValue();
    const existingItem = currentCart[item.id];

    const updatedItem = {
      ...item,
      cant: (existingItem ? existingItem.cant : 0) + item.cant,
    };

    this.cart.next({
      ...currentCart,
      [item.id]: updatedItem,
    });
  }

  removeItem(item: Item) {
    const currentCart = { ...this.cart.getValue() };

    if (currentCart[item.id]) {
      delete currentCart[item.id];
      this.cart.next(currentCart);
    }
  }

  getItemsLikeObject(): Observable<{ [id: string]: Item }> {
    return this.cart.asObservable();
  }

  getItemsLikeArray(): Observable<Item[]> {
    return this.cart.asObservable().pipe(map((items) => Object.values(items)));
  }

  getTotalItems(): Observable<number> {
    return this.getItemsLikeArray().pipe(
      map((items) => items.reduce((prev, curr) => prev + curr.cant, 0))
    );
  }

  getTotalPrice(): Observable<number> {
    return this.getItemsLikeArray().pipe(
      map((items) =>
        items.reduce((prev, curr) => prev + curr.price * curr.cant, 0)
      )
    );
  }
}
