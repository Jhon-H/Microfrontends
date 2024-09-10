import { Routes } from '@angular/router';
import { loadRemoteModule } from '@angular-architects/module-federation';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HomeComponent,
  },
  {
    path: 'plugin-a',
    loadChildren: () =>
      loadRemoteModule({
        type: 'manifest', // Busca en el manifesto la informacion necesaria
        remoteName: 'pluginA',
        exposedModule: './Module',
      }).then((m) => m.PluginAModule),
  },
  {
    path: 'plugin-b',
    loadChildren: () =>
      loadRemoteModule({
        type: 'manifest',
        remoteName: 'pluginB',
        exposedModule: './Module',
      }).then((m) => m.PluginBModule),
  },
  {
    path: 'plugin-c',
    loadChildren: () =>
      loadRemoteModule({
        type: 'manifest',
        remoteName: 'pluginC',
        exposedModule: './Module',
      }).then((m) => m.PluginCModule),
  },
];
