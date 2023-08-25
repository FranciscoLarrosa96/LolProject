import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { champAnimation } from 'src/app/core/animation';
import { ChampionData } from 'src/app/interfaces/champion.interface';
import { ChampionService } from 'src/app/services/lol-service.service';

@Component({
  selector: 'app-champion',
  templateUrl: './champion.component.html',
  styleUrls: ['./champion.component.scss'],
  animations:[champAnimation]
})
export class ChampionComponent implements OnInit, OnDestroy {
  nameChamp!: string;
  tittleChamp!:string;
  imgChamp!:string;
  private _unsubscribeAll: Subject<any>;


  constructor(private _champService: ChampionService, private route: ActivatedRoute) {
    this._unsubscribeAll = new Subject();
  }


  ngOnInit() {
    this.getChampData().then(champion => {
      this.loadData(champion);
    });
  }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }


  getChampData(): Promise<ChampionData> {
    this.route.params
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe({
        next: params => {
          this.nameChamp = params['id'];//Get id param
        }
      });

    return new Promise<ChampionData>((resolve, reject) => {
      this._champService.getChampionData(this.nameChamp)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(
        {
          next: (champion: ChampionData) => {
            resolve(champion);
          },
          error: (error: any) => {
            reject(error);
          }
        }
      );
    }
    );
  }

  loadData(champ:ChampionData){
    this.tittleChamp = champ.data[this.nameChamp].title;
    //Load champ image default
    this.imgChamp =  this.getSkinImage(this.nameChamp,0);
  }

  getSkinImage(name:string,num: number) {
    return `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${name}_${num}.jpg`;
  }
}
