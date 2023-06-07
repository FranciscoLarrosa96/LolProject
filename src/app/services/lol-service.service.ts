import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ChampionData } from '../interfaces/champion.interface';
@Injectable({
  providedIn: 'root'
})
export class LolServiceService {

  constructor(private http:HttpClient) { }

  getChampionData(nameChamp:string):Observable<ChampionData>{
   let url = `https://ddragon.leagueoflegends.com/cdn/13.11.1/data/en_US/champion/${nameChamp}.json`;
   return this.http.get<ChampionData>(url);
  }

  getAllChampionsData():Observable<ChampionData>{
    let url = 'https://ddragon.leagueoflegends.com/cdn/13.11.1/data/en_US/champion.json';
    return this.http.get<ChampionData>(url);
  }
}
