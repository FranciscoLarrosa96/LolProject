import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'champions',
        loadComponent: () => import('./components/champions/champions.component').then(m => m.ChampionsComponent)
    },
    {
        path: 'champion/:id',
        loadComponent: () => import('./components/champion/champion.component').then(m => m.ChampionComponent)
    },
    {
        path: '**',
        redirectTo: 'champions',
    },
];
