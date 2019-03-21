import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-vista-ranking',
  templateUrl: './vista-ranking.component.html',
  styleUrls: ['./vista-ranking.component.css']
})
export class VistaRankingComponent implements OnInit {

  @Input() arrTopRanking: any
  @Input() titulo: string
  @Input() tipoHijo: string

  constructor() { }

  ngOnInit() {
  }

 
}
