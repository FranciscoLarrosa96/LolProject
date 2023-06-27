import { ChangeDetectorRef, Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren, AfterViewInit } from '@angular/core';
import { Subject, debounceTime, fromEvent, takeUntil } from 'rxjs';
import { champAnimation } from 'src/app/core/animation';
import { ChampionData } from 'src/app/interfaces/champion.interface';
import { LolServiceService } from 'src/app/services/lol-service.service';

@Component({
  selector: 'app-champions',
  templateUrl: './champions.component.html',
  styleUrls: ['./champions.component.scss'],
  animations: [champAnimation]
})
export class ChampionsComponent implements OnInit, AfterViewInit {
  // Array of champs
  championsExtractorName: any[] = [];
  championsFullData: any[] = [];
  championsFullDataCopy: any[] = [];
  championsSortByPosition: any[] = [];
  champsNames: string[] = [];
  mouseHover: boolean[] = [];
  namesIcons: string[] = ['Assassin', 'Fighter', 'Mage', 'Marksman', 'Support', 'Tank'];
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(private lolService: LolServiceService) { }
  ngAfterViewInit(): void {
    // Obtén todas las filas de tarjetas
    const rows = document.querySelectorAll('.row');

    // Función para comprobar si un elemento está en el centro de la pantalla
    function isElementInViewport(el: any) {
      const rect = el.getBoundingClientRect();
      const windowHeight = window.innerHeight || document.documentElement.clientHeight;
      const windowWidth = window.innerWidth || document.documentElement.clientWidth;

      return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= windowHeight &&
        rect.right <= windowWidth
      );
    }

    // Función para manejar el desplazamiento de la página
    function handleScroll() {
      rows.forEach(row => {
        if (isElementInViewport(row)) {
          row.classList.add('show');
        } else {
          row.classList.remove('show');
        }
      });
    }

    // Agrega el evento de desplazamiento a la ventana
    window.addEventListener('scroll', handleScroll);

    // Ejecuta la función al cargar la página para mostrar las filas iniciales
    handleScroll();

  }



  ngOnInit(): void {
    this.getAllChampsData();
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next('');
    this._unsubscribeAll.complete();
  }





  // Get img champ
  getChampionImageURL(name: any, num: any) {
    return `http://ddragon.leagueoflegends.com/cdn/img/champion/loading/${name}_${num}.jpg`;
  }

  // Get champ data by his name, example : "Annie"
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




  // Get all champions data
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

  // Sort champ list by position
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
        filteredData = this.championsFullData.filter(item => item.tags.includes('Mage') || item.tags.includes('Assassin'));
        break;
      case 'jungle':
        filteredData = this.championsFullData.filter(item => item.tags.includes('Fighter') || item.tags.includes('Tank'));
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
    this.championsFullDataCopy = [...filteredData];
    // Fix opacity
    const containerElement = document.querySelectorAll('.row');
    containerElement.forEach(element => {
      element.classList.add('show')
    });


  }

  // Search by name champ
  searchByName(event: Event) {
    const target = event.target as HTMLInputElement;
    const value = target.value.toLowerCase();

    if (value === '') {
      this.championsFullDataCopy = this.championsFullData;
    } else {
      this.championsFullDataCopy = this.championsFullData.filter(item => item.id.toLowerCase().includes(value));
      // Fix opacity
      const containerElement = document.querySelectorAll('.row');
      containerElement.forEach(element => {
        element.classList.add('show')
      });
    }
  }

  // Converts the variable to true if the mouse is hovered over the card
  showDescription(index: number) {
    this.mouseHover[index] = true;
    console.log(this.championsFullData[index]);
    
  }
  // Converts the variable to false if the mouse leaves the card
  hiddenDescription(index: number) {
    this.mouseHover[index] = false;
  }



  // Convert "annie" on "Annie"
  capitalizeFirstLetter(word: string) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }
}
