import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy, inject, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { champAnimation } from 'src/app/core/animation';
import { ChampionData } from 'src/app/interfaces/champion.interface';
import { ChampionService } from 'src/app/services/lol-service.service';
import { AbilityVideo, abilities } from 'src/app/shared/championsSkills';
import { MaterialDesignModule } from 'src/material/material-design.module';

@Component({
  selector: 'app-champion',
  templateUrl: './champion.component.html',
  styleUrls: ['./champion.component.scss'],
  animations: [champAnimation],
  standalone: true,
  imports: [CommonModule, MaterialDesignModule]
})
export class ChampionComponent implements OnInit, OnDestroy {
  nameChamp!: string;
  tittleChamp!: string;
  imgChamp!: string;
  passive!: string;
  passiveUrl!: string;
  skinArray: string[] = [];
  skinArrayNames: string[] = [];
  spellsArrayNames: string[] = [];
  champion!: ChampionData;
  championLore!: string;
  championTags!: any;
  championDifficult!: any;
  numDifficult!: any;
  isPlaying = false;
  isActive = false;
  private _champService = inject(ChampionService);
  private _unsubscribeAll: Subject<any>;
  isMuted = true;
  @ViewChild('myVideo') myVideo!: ElementRef<HTMLVideoElement>;
  P_ability!: AbilityVideo[];
  Q_ability!: AbilityVideo[];
  W_ability!: AbilityVideo[];
  E_ability!: AbilityVideo[];
  R_ability!: AbilityVideo[];


  constructor(private route: ActivatedRoute) {
    this._unsubscribeAll = new Subject();
  }


  ngOnInit() {
    this.loadInfoChamp();
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
    this.loadSkins(this.nameChamp);
    this.loadSpells(this.nameChamp);
    this.loadPassive(this.nameChamp);
    this.championLore = this.champion.data[this.nameChamp].lore;
    this.championTags = this.champion.data[this.nameChamp].tags[0];
    this.numDifficult = this.champion.data[this.nameChamp].info.difficulty;
    this.P_ability = abilities[this.nameChamp].P;
    console.log("🚀 ~ ChampionComponent ~ loadData ~ this.P_ability:", this.P_ability)
    this.Q_ability = abilities[this.nameChamp].Q;
    this.W_ability = abilities[this.nameChamp].W;
    this.E_ability = abilities[this.nameChamp].E;
    this.R_ability = abilities[this.nameChamp].R;
    if ((this.numDifficult > 7)) {
      this.championDifficult = 'High';
    } else if ((this.numDifficult <= 7 && this.numDifficult >= 4)) {
      this.championDifficult = 'Medium';
    } else {
      this.championDifficult = 'Low';
    }
  }

  /**
   * Load data champ promise
   * @param champ 
   */
  loadInfoChamp() {
    this.getChampData().then(champion => {
      this.loadData(champion);
    });
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
  loadSkins(nameChamp: string) {
    for (let index = 0; index < this.champion.data[nameChamp].skins.length; index++) {
      this.skinArray.push(`https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${nameChamp}_${this.champion.data[nameChamp].skins[index].num}.jpg`);
      this.skinArrayNames.push(this.champion.data[nameChamp].skins[index].name)
    }
    // I delete the first element because it is the default skin
    this.skinArray.shift();
    this.skinArrayNames.shift();
  }

  /**
   * Load array Spells
   * @param nameChamp 
   */
  loadSpells(nameChamp: string) {
    for (let index = 0; index < this.champion.data[nameChamp].spells.length; index++) {
      this.spellsArrayNames.push(`https://ddragon.leagueoflegends.com/cdn/14.12.1/img/spell/${this.champion.data[nameChamp].spells[index].id}.png`)
    }
  }

  /**
   * Load passive image
   * @param nameChamp 
   */
  loadPassive(nameChamp: string) {
    this.passive = this.champion.data[nameChamp].passive.image.full;
    this.passiveUrl = `https://ddragon.leagueoflegends.com/cdn/14.12.1/img/passive/${this.passive}`;
  }

  onVideoPlay() {
    this.isPlaying = true;
  }

  onVideoPause() {
    this.isPlaying = false;
  }

  /**
   * Show hability video
   */
  showVideoSkill(index: number) {

  }
}
