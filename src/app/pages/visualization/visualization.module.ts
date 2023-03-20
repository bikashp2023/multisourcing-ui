import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VisualizationComponent } from './visualization.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { DonutChartComponent } from 'src/app/components/donut-chart/donut-chart.component';
import { NgxEchartsModule } from 'ngx-echarts';
import { KtdGridModule } from '@katoid/angular-grid-layout';
import { SideNavComponent } from 'src/app/components/sidenav/sidenav.component';
import { SideNavContentComponent } from 'src/app/components/side-nav-content/side-nav-content.component';

@NgModule({
  declarations: [
    VisualizationComponent,
    DonutChartComponent,
    SideNavComponent,
    SideNavContentComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    KtdGridModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts'),
    }),
    RouterModule.forChild([{ path: '', component: VisualizationComponent }]),
  ],
})
export class VisualizationModule {}
