import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChampionsRoutingModule } from './champions-routing.module';
import { ChampionsComponent } from './champions.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    ChampionsComponent
  ],
  imports: [
    CommonModule,
    ChampionsRoutingModule,
    RouterModule
  ]
})
export class ChampionsModule { }
