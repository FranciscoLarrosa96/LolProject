import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChampionsRoutingModule } from './champions-routing.module';
import { ChampionsComponent } from './champions.component';
import { RouterModule } from '@angular/router';
import { MaterialDesignModule } from 'src/material/material-design.module';


@NgModule({
  declarations: [
    ChampionsComponent
  ],
  imports: [
    CommonModule,
    ChampionsRoutingModule,
    RouterModule,
    MaterialDesignModule
  ]
})
export class ChampionsModule { }
