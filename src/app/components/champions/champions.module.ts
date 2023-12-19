import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChampionsRoutingModule } from './champions-routing.module';
import { ChampionsComponent } from './champions.component';
import { RouterModule } from '@angular/router';
import { MaterialDesignModule } from 'src/material/material-design.module';
import { InViewportDirective } from '../../in-viewport.directive';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ChampionsComponent,
    InViewportDirective
  ],
  imports: [
    CommonModule,
    ChampionsRoutingModule,
    RouterModule,
    MaterialDesignModule,
    ReactiveFormsModule
  ]
})
export class ChampionsModule { }
