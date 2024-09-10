import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadChildren: () =>
      import('./plugin-c/plugin-c.module').then((m) => m.PluginCModule),
  },
];
