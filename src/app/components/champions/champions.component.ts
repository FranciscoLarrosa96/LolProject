import { ChangeDetectorRef, Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren, AfterViewInit, signal, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, debounceTime, distinctUntilChanged, fromEvent, map, takeUntil } from 'rxjs';
import { champAnimation } from 'src/app/core/animation';
import { ChampionData } from 'src/app/interfaces/champion.interface';
import { ChampionService } from 'src/app/services/lol-service.service';

@Component({
  selector: 'app-champions',
  templateUrl: './champions.component.html',
  styleUrls: ['./champions.component.scss'],
  animations: [champAnimation]
})
export class ChampionsComponent implements OnInit, OnDestroy {
  // Array of champs
  championsExtractorName: any[] = [];
  championsFullData: any[] = [];
  championsFullDataCopy: any[] = [];
  championsSortByPosition: any[] = [];
  champsNames: string[] = [];
  mouseHover: boolean[] = [];
  containerEmpty: boolean = false;
  namesIcons: string[] = ['Assassin', 'Fighter', 'Mage', 'Marksman', 'Support', 'Tank'];
  tooltipMessage: string = '';
  searchInput: FormControl;
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(private lolService: ChampionService, private _router: Router) {
    this.searchInput = new FormControl('');
  }




  ngOnInit(): void {
    this.getAllChampsData();
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }


  /**
   * Get img champ
   * @param name 
   * @param num 
   * @returns 
   */
  getChampionImageURL(name: any, num: any): string {
    return `http://ddragon.leagueoflegends.com/cdn/img/champion/loading/${name}_${num}.jpg`;
  }

  /**
   * Get champ data by his name, example : "Annie"
   * @param name 
   */
  getChampDataByName(name: string) {
    name = this.capitalizeFirstLetter(name);

    this.lolService.getChampionData(name)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe({
        next: (champData: ChampionData) => {
          this.championsFullData.push(champData.data[name]);
        }
      });
  }

  /**
   * Get all champions data
   */
  getAllChampsData() {
    this.lolService.getAllChampionsData()
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe({
        next: (champsData: ChampionData) => {

          // Object.values allows me to access the property of the arrangement using an index
          this.championsExtractorName = Object.values(champsData.data);
          // Get all names champs
          this.championsExtractorName.forEach(element => {
            this.champsNames.push(element.id.replace(/\s|\./g, ''));
          });
          // Sort by name
          this.champsNames.sort();
          this.champsNames.forEach(element => {
            this.getChampDataByName(element);
          });
          this.championsFullDataCopy = this.championsFullData;
        }
      });
  }

  /**
   * Sort champ list by position
   * @param position 
   */
  sortByPosition(position: string) {
    let filteredData: any[] = this.championsFullData;
    switch (position) {
      case 'adc':
        filteredData = this.championsFullData.filter(item => item.tags.includes('Marksman'));
        break;
      case 'support':
        filteredData = this.championsFullData.filter(item => (item.tags.includes('Support') || (item.tags.includes('Support') && item.tags.includes('Tank'))));
        break;
      case 'mid':
        filteredData = this.championsFullData.filter(item => (item.tags.includes('Mage') && !item.tags.includes('Support')) || item.tags.includes('Assassin'));
        break;
      case 'jungle':
        filteredData = this.championsFullData.filter(item => item.tags.includes('Fighter') || item.tags.includes('Tank') && !item.tags.includes('Support'));
        break;
      case 'top':
        filteredData = this.championsFullData.filter(item => item.tags.includes('Fighter') && item.tags.includes('Tank'));
        break;
      case 'all':
        filteredData = this.championsFullData;
        break;

      default:
        break;
    }
    this.championsFullDataCopy = [];
    this.containerEmpty = true;
    setTimeout(() => {
      this.championsFullDataCopy = [...filteredData];
      this.containerEmpty = false;
    }, 300);
    // Fix opacity
    const containerElement = document.querySelectorAll('.row');
    containerElement.forEach(element => {
      element.classList.add('show')
    });


  }

  /**
   * Search by name champ
   * @param event 
   */
  searchByName() {
    this.searchInput
      .valueChanges
      .pipe(
        takeUntil(this._unsubscribeAll),
        debounceTime(300),
        distinctUntilChanged()
      )
      .subscribe(
        {
          next: text => {
            if (text === '') {
              this.championsFullDataCopy = this.championsFullData;
            } else {
              this.championsFullDataCopy = this.championsFullData.filter(item => item.id.toLowerCase().includes(text));
              // Fix opacity
              const containerElement = document.querySelectorAll('.row');
              containerElement.forEach(element => {
                element.classList.add('show')
              });
            }
          },
          error: err => {
            console.warn('Error input', err);
          }
        },
      );
  }

  /**
   * Converts the variable to true if the mouse is hovered over the card
   * @param index 
   */
  showDescription(index: number) {
    this.mouseHover[index] = true;
  }
  /**
   * Converts the variable to false if the mouse leaves the card
   * @param index 
   */
  hiddenDescription(index: number) {
    this.mouseHover[index] = false;
  }

  /**
   * Navigate to page champ description
   * @param nameChamp 
   */
  navigateChampPage(nameChamp: string) {
    this._router.navigate(['champion/' + nameChamp]);
  }

  /**
   * Convert "annie" on "Annie"
   * @param word 
   * @returns 
   */
  capitalizeFirstLetter(word: string) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }
}
