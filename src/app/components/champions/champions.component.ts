import { Component, OnInit } from '@angular/core';
import { ChampionData } from 'src/app/interfaces/champion.interface';
import { LolServiceService } from 'src/app/services/lol-service.service';

@Component({
  selector: 'app-champions',
  templateUrl: './champions.component.html',
  styleUrls: ['./champions.component.scss']
})
export class ChampionsComponent implements OnInit {
  // Array of champs
  champions:ChampionData[] = [];


  constructor(private lolService:LolServiceService){}



  ngOnInit(): void {
    this.getChampDataByName('annie');
  }

  getChampionImageURL() {
    return 'http://ddragon.leagueoflegends.com/cdn/img/champion/splash/Aatrox_0.jpg';
  }
 
  // Get champ data by his name, example : "Annie"
  getChampDataByName(name:string){
    name = this.capitalizeFirstLetter(name);
    console.log('asdsad',name);
    
    this.lolService.getChampionData(name)
    .subscribe({
      next: (res:ChampionData) =>{
        
        
      }
    });
  }

  // Convert "annie" on "Annie"
   capitalizeFirstLetter(word:string) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }
}
