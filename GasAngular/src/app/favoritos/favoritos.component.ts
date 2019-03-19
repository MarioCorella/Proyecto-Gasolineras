import { Component, OnInit, Input } from '@angular/core';
import { GasService } from '../gas.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.component.html',
  styleUrls: ['./favoritos.component.css']
})
export class FavoritosComponent implements OnInit {

   
   arrFavoritos: any[]
   tokenUsuario: string
   
  constructor(private gasService: GasService, private router: Router) { }

  ngOnInit() {
    this.tokenUsuario = localStorage.getItem('Token')
    //console.log(this.arrInput)
    this.gasService.getFavoritos(this.tokenUsuario).then((result) => {
      this.arrFavoritos = result
      console.log(this.arrFavoritos) 
    })
  }

  deleteFavorite(id){
    console.log(id)
    console.log(this.tokenUsuario)
    this.gasService.deleteFavorite(id, this.tokenUsuario).then((result) => {
      console.log('hola')
      this.gasService.getFavoritos(this.tokenUsuario).then((result) => {
        this.arrFavoritos = result
        console.log(this.arrFavoritos) 
      })
    })
  }

}
