import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GraphqlComponent } from './graphql.component';
import { MaterialModule } from 'src/app/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { GraphqlService } from './graphql.service';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@NgModule({
  declarations: [
    GraphqlComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule
  ],
  providers: [ GraphqlService],
  exports: [ GraphqlComponent ]
})
export class GraphqlModule { }
