import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy, inject, ViewChild, ElementRef, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { champAnimation } from 'src/app/core/animation';
import { ChampionData, SpellChamp } from 'src/app/interfaces/champion.interface';
import { ChampionService } from 'src/app/services/lol-service.service';
import { MaterialDesignModule } from 'src/material/material-design.module';
import { register } from 'swiper/element/bundle';
register();
@Component({
  selector: 'app-champion',
  templateUrl: './champion.component.html',
  styleUrls: ['./champion.component.scss'],
  animations: [champAnimation],
  standalone: true,
  imports: [CommonModule, MaterialDesignModule],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class ChampionComponent implements OnInit, OnDestroy {
  urlVideoSpell: string = '';
  abilityToShow: string = 'P';
  nameChamp!: string;
  tittleChamp!: string;
  imgChamp!: string;
  passiveChamp!: any;
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
  Q!: SpellChamp;
  W!: SpellChamp;
  E!: SpellChamp;
  R!: SpellChamp;


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
    if ((this.numDifficult > 7)) {
      this.championDifficult = 'High';
    } else if ((this.numDifficult <= 7 && this.numDifficult >= 4)) {
      this.championDifficult = 'Medium';
    } else {
      this.championDifficult = 'Low';
    }
    this.loadUrlVideoSpells();
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
   * Set url video spell
   */
  loadUrlVideoSpells() {
    switch (this.champion.data[this.nameChamp].key.length) {
      case 1:
        this.urlVideoSpell = `https://d28xe8vt774jo5.cloudfront.net/champion-abilities/000${this.champion.data[this.nameChamp].key}/ability_000${this.champion.data[this.nameChamp].key}`;
        break;
      case 2:
        this.urlVideoSpell = `https://d28xe8vt774jo5.cloudfront.net/champion-abilities/00${this.champion.data[this.nameChamp].key}/ability_00${this.champion.data[this.nameChamp].key}`;
        break;
      case 3:
        this.urlVideoSpell = `https://d28xe8vt774jo5.cloudfront.net/champion-abilities/0${this.champion.data[this.nameChamp].key}/ability_0${this.champion.data[this.nameChamp].key}`;
        break;

      default:
        break;
    }
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
      this.spellsArrayNames.push(`https://ddragon.leagueoflegends.com/cdn/14.12.1/img/spell/${this.champion.data[nameChamp].spells[index].id}.png`);
      switch (index) {
        case 0:
          this.Q = this.champion.data[nameChamp].spells[index];
          this.Q.description = this.Q.description.replace(/<\/?physicalDamage>|<br\s*\/?>|<br><br>|<font color='#9b0f5f'>|<\/font>|<\/?keywordMajor>|<font color='#FFF673'>/g, "");
          break;
        case 1:
          this.W = this.champion.data[nameChamp].spells[index];
          this.W.description = this.W.description.replace(/<\/?physicalDamage>|<br\s*\/?>|<br><br>|<font color='#9b0f5f'>|<\/font>|<\/?keywordMajor>|<font color='#FFF673'>/g, "");
          break;
        case 2:
          this.E = this.champion.data[nameChamp].spells[index];
          this.E.description = this.E.description.replace(/<\/?physicalDamage>|<br\s*\/?>|<br><br>|<font color='#9b0f5f'>|<\/font>|<\/?keywordMajor>|<font color='#FFF673'>/g, "");
          break;
        case 3:
          this.R = this.champion.data[nameChamp].spells[index];
          this.R.description = this.R.description.replace(/<\/?physicalDamage>|<br\s*\/?>|<br><br>|<font color='#9b0f5f'>|<\/font>|<\/?keywordMajor>|<font color='#FFF673'>/g, "");
          break;
      }
    }
  }

  /**
   * Load passive image
   * @param nameChamp 
   */
  loadPassive(nameChamp: string) {
    this.passiveChamp = this.champion.data[nameChamp].passive;
    this.passiveChamp.description = this.passiveChamp.description.replace(/<\/?physicalDamage>|<br\s*\/?>|<br><br>|<font color='#9b0f5f'>|<font color='#FF9900'>|<font color='#cccc00'>|<\/font>|<\/?keywordMajor>|<font color='#FFF673'>/g, "");
    this.passiveUrl = `https://ddragon.leagueoflegends.com/cdn/14.12.1/img/passive/${this.champion.data[nameChamp].passive.image.full}`;
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
