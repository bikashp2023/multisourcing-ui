import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'dataset', loadChildren: () => import('./pages/dataset/dataset.module').then(m => m.DatasetModule)},
  { path: 'visualize', loadChildren: () => import('./pages/visualization/visualization.module').then(m => m.VisualizationModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
