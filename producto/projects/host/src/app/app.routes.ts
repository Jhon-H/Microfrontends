import { Routes } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadChildren: () => import('mf-home/routes').then((m) => m.routes),
  },
  {
    path: 'cart',
    loadChildren: () => import('mf-cart/routes').then((m) => m.routes),
  },
  {
    path: 'products',
    loadChildren: () => import('mf-product-list/routes').then((m) => m.routes),
  },
  {
    // TODO: acceder al product-id desde el MF, se comparte el router ?
    path: 'product/:productId',
    loadChildren: () =>
      import('mf-product-detail/routes').then((m) => m.routes),
  },
  {
    path: '404',
    component: NotFoundComponent,
  },
  {
    path: '**',
    redirectTo: '/404',
  },
];
