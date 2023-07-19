import { Injectable,inject,signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, tap } from 'rxjs';
import { ChampionData } from '../interfaces/champion.interface';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class LolServiceService {

  private http = inject(HttpClient);
  dataSignal = signal<ChampionData | undefined>(undefined);
  constructor() { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    return new Promise((resolve, reject) => {
        Promise.all([
        ]).then(
            () => {
              console.log('entroooooooooo',route.params['id']);
              this.getChampionData(route.params['id'])
              .subscribe({
                next: (res:ChampionData) => {
                  console.log('resss',res.data[route.params['id']]);
                  let dataa = res.data[route.params['id']];
                  let {skins} = res.data[route.params['id']];
                  console.log('resss2222',skins);
                }
              })
                resolve('');
            },
            (error) => {
              resolve(error);
            }
        );
    });
}


  getChampionData(nameChamp:string):Observable<ChampionData>{
   let url = `https://ddragon.leagueoflegends.com/cdn/13.11.1/data/en_US/champion/${nameChamp}.json`;
   return this.http.get<ChampionData>(url);
  }

  getAllChampionsData():Observable<ChampionData>{
    let url = 'https://ddragon.leagueoflegends.com/cdn/13.11.1/data/en_US/champion.json';
    return this.http.get<ChampionData>(url)
    .pipe(
      tap((res:ChampionData) => this.dataSignal.set(res)),
      )
  }
}
