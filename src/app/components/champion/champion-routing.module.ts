import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChampionComponent } from './champion.component';
import { LolServiceService } from 'src/app/services/lol-service.service';

const routes: Routes = [

  {
    path: '',
    component: ChampionComponent,
    resolve: {
      champion: LolServiceService
    }
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChampionRoutingModule { }
