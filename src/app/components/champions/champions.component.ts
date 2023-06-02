import { Component, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { ChampionData } from 'src/app/interfaces/champion.interface';
import { LolServiceService } from 'src/app/services/lol-service.service';

@Component({
  selector: 'app-champions',
  templateUrl: './champions.component.html',
  styleUrls: ['./champions.component.scss']
})
export class ChampionsComponent implements OnInit {
  // Array of champs
  championsExtractorName:any[] = [];
  championsFullData:any [] = [];
  champsNames:string[] = [];
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(private lolService:LolServiceService){}



  ngOnInit(): void {
    this.getAllChampsData();    
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next('');
    this._unsubscribeAll.complete();
}





  // Get img champ
  getChampionImageURL(name:any,num:any) {
    return `http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${name}_${num}.jpg`;
  }
 
  // Get champ data by his name, example : "Annie"
  getChampDataByName(name:string){
    name = this.capitalizeFirstLetter(name);
    
    this.lolService.getChampionData(name)
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe({
      next: (champData:ChampionData) =>{
        this.championsFullData.push(champData);
      }
    });
  }




  // Get all champions data
  getAllChampsData(){
    this.lolService.getAllChampionsData()
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe({
      next: (champsData:ChampionData) => {

        // Object.values allows me to access the property of the arrangement using an index
          this.championsExtractorName = Object.values(champsData.data);
        // Get all names champs
          this.championsExtractorName.forEach(element=> {
              this.champsNames.push(element.id.replace(/\s|\./g, ''));
          });

            
            this.champsNames.forEach(element => {
            this.getChampDataByName(element);
          });

          setTimeout(() => {
            this.championsFullData.forEach((item, index) => {
              this.championsFullData.push(Object.values(this.championsFullData[index].data));
            });
            
            console.log('funca?',this.championsFullData);
          }, 1500);
      }
    });
  }



    // Convert "annie" on "Annie"
    capitalizeFirstLetter(word:string) {
      return word.charAt(0).toUpperCase() + word.slice(1);
    }
}
