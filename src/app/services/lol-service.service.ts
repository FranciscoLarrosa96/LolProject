import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { ChampionData } from '../interfaces/champion.interface';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class ChampionService {

  private http = inject(HttpClient);


  constructor() {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    return new Promise((resolve, reject) => {
        Promise.all([
        ]).then(
            () => {
                resolve('');
            },
            (error) => {
              resolve(error);
            }
        );
    });
  }


  getChampionData(nameChamp: string): Observable<ChampionData> {
    let url = `https://ddragon.leagueoflegends.com/cdn/13.19.1/data/en_US/champion/${nameChamp}.json`;
    return this.http.get<ChampionData>(url);
  }

  getAllChampionsData(): Observable<ChampionData> {
    let url = 'https://ddragon.leagueoflegends.com/cdn/13.19.1/data/en_US/champion.json';
    return this.http.get<ChampionData>(url);
  }


}
