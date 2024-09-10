import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PluginAComponent } from './plugin-a.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: PluginAComponent,
  },
];

@NgModule({
  declarations: [PluginAComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class PluginAModule {}
