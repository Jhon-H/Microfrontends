import { NgModule } from '@angular/core';
import { PluginCComponent } from './plugin-c.component';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: PluginCComponent },
];

@NgModule({
  declarations: [PluginCComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class PluginCModule {}
