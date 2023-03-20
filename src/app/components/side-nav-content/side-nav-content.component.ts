import { Component } from '@angular/core';
import { WidgetCommunicationService } from 'src/app/services/widget-communication.service';
import { DonutChartComponent } from '../donut-chart/donut-chart.component';

@Component({
  selector: 'app-side-nav-content',
  templateUrl: './side-nav-content.component.html',
  styleUrls: ['./side-nav-content.component.scss'],
})
export class SideNavContentComponent {
  constructor(private widgetService: WidgetCommunicationService) {}

  ngOnInit(): void {}

  addVisualization(item: string) {
    let component;
    switch (item) {
      case 'simple_bar': {
        component = DonutChartComponent;
        break;
      }
      case 'donut': {
        component = DonutChartComponent;
        break;
      }
      case 'line': {
        component = DonutChartComponent;
        break;
      }
      default: {
        component = DonutChartComponent;
      }
    }
    this.widgetService.sendDataToSubscribers(component);
  }
}
