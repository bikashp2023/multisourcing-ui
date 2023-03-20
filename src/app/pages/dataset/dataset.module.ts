import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatasetComponent } from './dataset.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { FormsModule } from '@angular/forms';
import { GraphqlModule } from './graphql/graphql.module';
import { UploadfileModule } from './uploadfile/uploadfile.module';

@NgModule({
  declarations: [DatasetComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    GraphqlModule,
    UploadfileModule,
    RouterModule.forChild([
      {
        path: '',
        component: DatasetComponent,
      },
    ]),
  ]
})
export class DatasetModule {}
