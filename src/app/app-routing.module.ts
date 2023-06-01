import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path : '**',
    redirectTo : 'champions',
    pathMatch : 'full'
  },
  {
    path: 'champions',
    loadChildren: () => import('./components/champions/champions.module').then(m => m.ChampionsModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
