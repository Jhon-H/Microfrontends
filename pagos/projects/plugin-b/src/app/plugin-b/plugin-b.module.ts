import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PluginBComponent } from './plugin-b.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: PluginBComponent },
];

@NgModule({
  declarations: [PluginBComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class PluginBModule {}
