import { Component, OnInit } from '@angular/core';
import { GasService } from '../gas.service';

@Component({
  
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.css']
})
export class RankingComponent implements OnInit {

  tipoButton: string
  topFive: any []
  rankingSeleccionado: any[]
  tituloSeleccionado: string

  constructor(private gasService: GasService) { 
    //this.topFive = []
    this.rankingSeleccionado = []
  }

  ngOnInit() {

    this.gasService.getRanking().then(result => {  
      this.topFive = result
     //console.log(this.topFive)
     // console.log(this.topFive['biodiesel'][1].precio_biodiesel)
    })
  }

  handleRanking(tipo){
   this.rankingSeleccionado = this.topFive[tipo]
   this.tipoButton = tipo
   this.tituloSeleccionado = tipo.split('_').filter((item) => {
    return item != 'precio'
   }).map((item) => {
    return item.charAt(0).toUpperCase() + item.slice(1);
   }).join(' ')
   console.log(this.tituloSeleccionado)
  }

  

}
