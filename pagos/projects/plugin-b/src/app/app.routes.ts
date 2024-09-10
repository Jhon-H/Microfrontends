import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadChildren: () => import('./plugin-b/plugin-b.module').then(m => m.PluginBModule)
  }
];
