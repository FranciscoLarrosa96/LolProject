import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChampionRoutingModule } from './champion-routing.module';
import { RouterModule } from '@angular/router';
import { ChampionComponent } from './champion.component';


@NgModule({
  declarations: [ChampionComponent],
  imports: [
    CommonModule,
    ChampionRoutingModule,
    RouterModule
  ]
})
export class ChampionModule { }
