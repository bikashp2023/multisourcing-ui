import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploadfileComponent } from './uploadfile.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';


@NgModule({
  declarations: [
    UploadfileComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [ UploadfileComponent ]
})
export class UploadfileModule { }
