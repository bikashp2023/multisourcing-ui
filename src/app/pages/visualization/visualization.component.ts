import { DOCUMENT } from '@angular/common';
import { Component, Inject, ViewChild } from '@angular/core';
import {
  KtdGridComponent,
  KtdGridLayoutItem,
  ktdTrackById,
} from '@katoid/angular-grid-layout';
import { debounceTime, fromEvent, merge, Subscription } from 'rxjs';
import { DonutChartComponent } from 'src/app/components/donut-chart/donut-chart.component';
import { NavigationService } from 'src/app/services/navigation.service';
import { WidgetCommunicationService } from 'src/app/services/widget-communication.service';
import { ktdArrayRemoveItem } from 'src/app/utils/utils';

interface KtdGridLayoutItemExtra extends KtdGridLayoutItem {
  component?: any;
}

@Component({
  selector: 'app-visualization',
  templateUrl: './visualization.component.html',
  styleUrls: ['./visualization.component.scss'],
})
export class VisualizationComponent {
  @ViewChild(KtdGridComponent, { static: true }) grid!: KtdGridComponent;
  title = 'angular-grid-layout-app';
  cols: number = 6;
  rowHeight: number = 150;
  resizedItem: any;
  layout: any = [
    { id: '0', x: 0, y: 0, w: 3, h: 3, component: DonutChartComponent },
    { id: '1', x: 3, y: 0, w: 3, h: 3, component: DonutChartComponent },
    {
      id: '2',
      x: 0,
      y: 3,
      w: 3,
      h: 3,
      minW: 2,
      minH: 3,
      component: DonutChartComponent,
    },
    {
      id: '3',
      x: 3,
      y: 3,
      w: 3,
      h: 3,
      minW: 2,
      maxW: 3,
      minH: 2,
      maxH: 5,
      component: DonutChartComponent,
    },
  ];
  trackById = ktdTrackById;
  private resizeSubscription!: Subscription;
  layoutSizes: { [id: string]: [number, number] } = {};

  data = [
    {
      group: 'Qty',
      value: 65000,
    },
    {
      group: 'More',
      value: 29123,
    },
    {
      group: 'Sold',
      value: 35213,
    },
    {
      group: 'Restocking',
      value: 51213,
    },
    {
      group: 'Misc',
      value: 16932,
    },
  ];
  options = {
    title: 'Vertical simple bar (discrete)',
    axes: {
      left: {
        mapsTo: 'value',
      },
      bottom: {
        mapsTo: 'group',
        scaleType: 'labels',
      },
    },
    height: '400px',
  };

  constructor(
    @Inject(DOCUMENT) public document: Document,
    private widgetService: WidgetCommunicationService,
    private navService: NavigationService
  ) {}

  ngOnInit() {
    this.resizeSubscription = merge(
      fromEvent(window, 'resize'),
      fromEvent(window, 'orientationchange')
    )
      .pipe(debounceTime(50))
      .subscribe(() => {
        this.grid.resize();
        this.calculateLayoutSizes();
      });

    this.widgetService.data.subscribe((item) => {
      if (item) {
        this.addItemToLayout(item);
      }
    });
  }

  private calculateLayoutSizes() {
    const gridItemsRenderData = this.grid.getItemsRenderData();
    this.layoutSizes = Object.keys(gridItemsRenderData).reduce(
      (acc, cur) => ({
        ...acc,
        [cur]: [
          gridItemsRenderData[cur].width,
          gridItemsRenderData[cur].height,
        ],
      }),
      {}
    );
  }

  resizeEnded($event: any) {
    console.log('Resize ended', $event);
    const { layoutItem } = $event;
    this.resizedItem = layoutItem;
    console.log('Resize ended this.resizedItem', this.resizedItem);
  }
  onLayoutUpdated(layout: any) {
    console.log('on layout updated', layout);

    if (this.resizedItem) {
      for (let item of this.layout) {
        if (item.id === this.resizedItem.id) {
          const component = item.component;
          item = { ...this.resizedItem, component };
        }
      }
    } else {
      this.layout = layout;
    }
  }

  /** Adds a grid item to the layout */
  addItemToLayout(type: any) {
    const maxId = this.layout.reduce(
      (acc: any, cur: any) => Math.max(acc, parseInt(cur.id, 10)),
      -1
    );
    const nextId = maxId + 1;

    const newLayoutItem: KtdGridLayoutItemExtra = {
      id: nextId.toString(),
      x: 0,
      y: 0,
      w: 3,
      h: 3,
      component: type,
    };

    // Important: Don't mutate the array, create new instance. This way notifies the Grid component that the layout has changed.
    this.layout = [newLayoutItem, ...this.layout];
  }

  stopEventPropagation(event: Event) {
    event.preventDefault();
    event.stopPropagation();
  }

  /** Removes the item from the layout */
  removeItem(id: string) {
    // Important: Don't mutate the array. Let Angular know that the layout has changed creating a new reference.
    this.layout = ktdArrayRemoveItem(
      this.layout,
      (item: any) => item.id === id
    );
  }

  onResize(event: any) {
    console.log(event);
  }

  ngOnDestroy() {
    this.resizeSubscription.unsubscribe();
  }

  toggleSideNav() {
    this.navService.setShowNav(true);
  }
}
