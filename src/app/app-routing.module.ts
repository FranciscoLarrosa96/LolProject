import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'champions',
    loadChildren: () => import('./components/champions/champions.module').then(m => m.ChampionsModule)
  },
  {
    path: 'champion/:id',
    loadChildren: () => import('./components/champion/champion.module').then(m => m.ChampionModule)
  },
  {
    path : '**',
    redirectTo : 'champions',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
