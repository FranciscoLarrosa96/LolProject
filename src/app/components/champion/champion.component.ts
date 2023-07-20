import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChampionData } from 'src/app/interfaces/champion.interface';

@Component({
  selector: 'app-champion',
  templateUrl: './champion.component.html',
  styleUrls: ['./champion.component.scss']
})
export class ChampionComponent {
  champion!: ChampionData;
  constructor(private route: ActivatedRoute) { }
  ngOnInit() {
    // Accede a los datos resueltos utilizando la propiedad 'data' del ActivatedRoute
    this.route.data.subscribe(data => {
      // this.champion = data.champion;
      console.log(this.champion); // Aquí puedes hacer lo que necesites con los datos 'champion'
    });
  }
}
