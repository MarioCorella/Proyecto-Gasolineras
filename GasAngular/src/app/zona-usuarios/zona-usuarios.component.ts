import { Component, OnInit, ViewChild } from '@angular/core';
import { GasService } from '../gas.service';
import { Router } from '@angular/router';

declare var google;

@Component({
  selector: 'app-zona-usuarios',
  templateUrl: './zona-usuarios.component.html',
  styleUrls: ['./zona-usuarios.component.css']
})
export class ZonaUsuariosComponent implements OnInit {

  @ViewChild('googleMap') gMap: any

  latitud: any
  longitud: any
  arrGasolineras: any[]
  map: any
  directionsDisplay: any
  directionsService: any
  markerLat: any;
  markerLong: any
  ngRadio: any
  radio: any
  position: any
  tipo: string
  //arrGasolineras: any[]
  arrFiltrado: any[]
  arrOrdenado: any []

  constructor(private gasServive: GasService, private router: Router) {

    this.radio = 3000
  }

  ngOnInit() {

  }

  getTipo(){
    this.gasServive.getTipo(this.tipo).then((res) => {
      this.arrGasolineras = res
      this.arrFiltrado = res
    })
  }

  filtrarPrecio(){
    this.arrFiltrado = [...this.arrGasolineras]

    this.arrFiltrado =this.arrFiltrado.filter(item => {
      return item[this.tipo] != null
    })

    this.arrFiltrado = this.ordenar(this.arrFiltrado, this.tipo)
    console.log(this.arrFiltrado)
  }
  
  ordenar(array, clave) {
    let arrayOrdenado = array.sort(function (a, b) {
       return a[clave] > b[clave]  
    })
    return  arrayOrdenado;
    //console.log(arrayOrdenado)
  }

  cambiarRadio() {
    this.radio = this.ngRadio
    //obtener los nuevos markers y pintarlos 
    this.gasServive.getGasolinerasLocalizacion(this.latitud, this.longitud, parseInt(this.radio)).then((res) => {
      this.arrGasolineras = res
      this.getMarkersPosition()
    })

  }

  activarLocalizacion() {
    if (navigator.geolocation) {
     navigator.geolocation.getCurrentPosition(this.showPosition.bind(this), this.showError)   
    }
  }

  showPosition(position) {
    //console.log(position)
    this.latitud = position.coords.latitude
    this.longitud = position.coords.longitude
    this.gasServive.getGasolinerasLocalizacion(this.latitud, this.longitud, parseInt(this.radio)).then((res) => {
      this.arrGasolineras = res
      //console.log(this.arrGasolineras)
      this.loadMap(position)
    })
  }

  showError(error) {
    console.log(error.code)
    switch (error.code) {
      case error.PERMISSION_DENIED:
        console.log('El usuario no quiere ser geolocalizado')
        break
      case error.POSITION_UNAVAILABLE:
        console.log('No se ha podido recuperar la posicion')
        break
      case error.TIMEOUT:
        console.log('Se ha tardado demasiado en recuperar la posicion')
        break
      case error.UNKNOW_ERROR:
        console.log('Error desconocido')
        break
    }
  }

  loadMap(position) {

    this.directionsService = new google.maps.DirectionsService()
    this.directionsDisplay = new google.maps.DirectionsRenderer()

    let propsMap = {
      center: new google.maps.LatLng(position.coords.latitude,
        position.coords.longitude),
      zoom: 10,
      mapTypeId: google.maps.MapTypeId.SATELLITE
    }
    this.map = new google.maps.Map(this.gMap.nativeElement, propsMap)
    this.getMarkersPosition()
    this.directionsDisplay.setMap(this.map)
  }

  getMarkersPosition() {
    let bounds = new google.maps.LatLngBounds()
    for (let i = 0; i < this.arrGasolineras.length; i++) {
      let marker = new google.maps.Marker({
        position: new google.maps.LatLng(this.arrGasolineras[i].latitud, this.arrGasolineras[i].longitud),
        title: this.arrGasolineras[i].rotulo,
        map: this.map
      })
      bounds.extend(new google.maps.LatLng(this.arrGasolineras[i].latitud, this.arrGasolineras[i].longitud))
    }
    this.map.fitBounds(bounds)
  }

  generateRoute(latGas, lngGas) {
    let start = new google.maps.LatLng(this.latitud, this.longitud)
    let end = new google.maps.LatLng(latGas, lngGas)
    //console.log(start, end)

    let requestOpts = {
      origin: start,
      destination: end,
      travelMode: google.maps.TravelMode['DRIVING']
    }

    this.directionsService.route(requestOpts, (result) => {
      this.directionsDisplay.setDirections(result)
      //console.log(result.routes[0])
    })
  }
  editarUsuario() {
    this.router.navigate(['/edita-usuario'])
  }

  logOut(){
    localStorage.removeItem('Token')
    this.router.navigate(['inicio'])
  }

  


}
