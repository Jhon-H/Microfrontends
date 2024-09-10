import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadChildren: () =>
      import('./plugin-a/plugin-a.module').then((m) => m.PluginAModule),
  },
];
