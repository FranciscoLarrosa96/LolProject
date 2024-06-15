import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';
import { ChampionData } from '../interfaces/champion.interface';
@Injectable({
  providedIn: 'root'
})
export class ChampionService {

  private http = inject(HttpClient);


  constructor() {}

  /**
   * Get champ data by name
   * @param nameChamp 
   * @returns 
   */
  getChampionData(nameChamp: string): Observable<ChampionData> {
    let url = `https://ddragon.leagueoflegends.com/cdn/14.12.1/data/en_US/champion/${nameChamp}.json`;
    return this.http.get<ChampionData>(url);
  }

  /**
   * Get all champ data
   * @returns 
   */
  getAllChampionsData(): Observable<ChampionData> {
    let url = 'https://ddragon.leagueoflegends.com/cdn/14.12.1/data/en_US/champion.json';
    return this.http.get<ChampionData>(url);
  }


}
