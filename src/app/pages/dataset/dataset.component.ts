import { Component, ViewChild } from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { MatSidenav } from '@angular/material/sidenav';
import { GraphqlComponent } from './graphql/graphql.component';

interface SourceDatasets {
  type: string;
  viewText: string;
}

@Component({
  selector: 'app-dataset',
  templateUrl: './dataset.component.html',
  styleUrls: ['./dataset.component.scss']
})
export class DatasetComponent {
  imageName = "test";
  selectedSource!: string;
  @ViewChild('sidenavEnd')
  private sideNavEnv!: MatSidenav

  constructor() {

  }
  sourceDatasets : SourceDatasets[] =  [
    {type: 'graphql', viewText: 'GraphQL'},
    {type: 'uploadfile', viewText: 'Upload a file'},
  ];

  openDrawer(source: any): void {
    console.log(source);
    this.selectedSource = source.type;
    this.sideNavEnv.toggle();
  }

}
