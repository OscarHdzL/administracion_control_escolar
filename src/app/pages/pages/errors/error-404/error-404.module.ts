import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Error404RoutingModule } from './error-404-routing.module';
import { Error404Component } from './error-404.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [Error404Component],
  imports: [
    CommonModule,
    Error404RoutingModule,
    MatButtonModule,

    MatIconModule
  ]
})
export class Error404Module {
}
