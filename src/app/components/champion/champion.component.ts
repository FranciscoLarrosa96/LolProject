import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { champAnimation } from 'src/app/core/animation';
import { ChampionData } from 'src/app/interfaces/champion.interface';
import { ChampionService } from 'src/app/services/lol-service.service';

@Component({
  selector: 'app-champion',
  templateUrl: './champion.component.html',
  styleUrls: ['./champion.component.scss'],
  animations: [champAnimation]
})
export class ChampionComponent implements OnInit, OnDestroy {
  nameChamp!: string;
  tittleChamp!: string;
  imgChamp!: string;
  skinArray: string[] = [];
  champion!: ChampionData;
  championLore!: string;
  championTags!: any;
  championDifficult!: any;
  numDifficult!: any;
  private _champService = inject(ChampionService);
  private _unsubscribeAll: Subject<any>;


  constructor(private route: ActivatedRoute) {
    this._unsubscribeAll = new Subject();
  }


  ngOnInit() {
    this.getChampData().then(champion => {
      this.loadData(champion);
      this.loadSkins(this.nameChamp);
      this.championLore = this.champion.data[this.nameChamp].lore;
      this.championTags = this.champion.data[this.nameChamp].tags[0];
      this.numDifficult = this.champion.data[this.nameChamp].info.difficulty;
      if ((this.numDifficult >= 7)) {
        this.championDifficult = 'High';
      } else if ((this.numDifficult < 7 && this.numDifficult >= 4)) {
        this.championDifficult = 'Medium';
      } else {
        this.championDifficult = 'Low';
      }
    });
  }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

  /**
   * Load champ object
   * @returns 
   */
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
              this.champion = champion;
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

  /**
   * Load data champ
   * @param champ 
   */
  loadData(champ: ChampionData) {
    this.tittleChamp = champ.data[this.nameChamp].title;
    //Load champ image default
    this.imgChamp = this.getSkinImage(this.nameChamp, 0);
  }

  /**
   * Returns champ skins
   * @param name 
   * @param num 
   * @returns 
   */
  getSkinImage(name: string, num: number): string {
    return `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${name}_${num}.jpg`;
  }

  /**
   * Load champ skins in an array
   * @param nameChamp 
   */
  loadSkins(nameChamp: any) {
    for (let index = 0; index < this.champion.data[nameChamp].skins.length; index++) {
      this.skinArray.push(`https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${nameChamp}_${this.champion.data[nameChamp].skins[index].num}.jpg`)
    }
    // I delete the first element because it is the default skin
    this.skinArray.shift();
  }
}
