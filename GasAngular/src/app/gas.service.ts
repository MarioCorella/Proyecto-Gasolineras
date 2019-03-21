import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class GasService {

  urlAccess = "http://localhost:3000/api/usuarios/access"
  urlReg = "http://localhost:3000/api/usuarios/create";
  urlLogin = "http://localhost:3000/api/login/access";
  urlGas = "http://gasextractor.herokuapp.com/api/station/40.42244931586505/-3.7025214224808165/1000"
  urlEditaUsuario = "http://localhost:3000/api/usuarios/edit"
  urlFiltroProvincia = "http://localhost:3000/api/filtros/provincias/";
  urlFiltroMunicipio = "http://localhost:3000/api/filtros/municipios/";
  urlFiltros = "http://localhost:3000/api/filtros";
  urlRanking = "http://localhost:3000/api/filtros/ranking";
  urlUpdate = "http://localhost:3000/api/usuarios/update";
  urlFiltrosUsers = "http://localhost:3000/api/filtros/users";
  urlFavoritos = "http://localhost:3000/api/filtros/favoritos/";
  urlDeleteFav = "http://localhost:3000/api/filtros/deleteFav";

  constructor(private httpClient: HttpClient) { }


  addGasFavorite(id, token) {
    return this.httpClient.post<any[]>(`${this.urlFavoritos}`, { id: id, token: token }).toPromise()
  }

  deleteFavorite(id, token) {
    return this.httpClient.post<any[]>(`${this.urlDeleteFav}`, { id: id, token: token }).toPromise()
  }

  enviarDatosReg(userData) {
    return this.httpClient.post<any>(`${this.urlReg}`, userData).toPromise()
  }

  comprobarLogin(loginData) {
    return this.httpClient.post<any[]>(`${this.urlLogin}`, loginData).toPromise()
  }

  async getGasolinerasLocalizacion(lat, long, radio) {

    let arrGas = await this.httpClient.get<any[]>(`https://gasextractor.herokuapp.com/api/station/${lat}/${long}/${radio}`).toPromise()

    let arrFavs = await this.getFavoritos(localStorage.getItem('Token'))

    let arrFinal = arrGas.map(item => {

      let incluido = arrFavs.find((gasSt) => item.id === gasSt.id)

      if (incluido) {
        item.favorito = true
      }
      return item
    })

    return new Promise((resolve, reject) => {
      resolve(arrFinal)
    })
  }

  getFiltros(provincia, municipio) {
    return this.httpClient.post<any[]>(`${this.urlFiltros}`, {
      provincia: provincia,
      municipio: municipio
    }).toPromise()
  }

  getProvincias() {
    return this.httpClient.get<any[]>(`${this.urlFiltroProvincia}`).toPromise()
  }

  getMunicipios(provincia) {
    //console.log(provincia)
    return this.httpClient.post<any[]>(`${this.urlFiltroMunicipio}`, { provincia: provincia }).toPromise()
  }

  getRanking() {
    return this.httpClient.get<any[]>(`${this.urlRanking}`).toPromise()
  }

  getUsuario(token) {
    return this.httpClient.post<any[]>(`${this.urlEditaUsuario}`, { token: token }).toPromise()
  }

  editaUsuario(id, nombre, email) {
    console.log(nombre)
    return this.httpClient.post<any[]>(`${this.urlUpdate}`, {
      id: id,
      nombre: nombre,
      email: email
    }).toPromise()
  }

  estadoLogin() {
    if (localStorage.getItem('Token')) {
      return true
    } else {
      return false
    }
  }

  getTipo(tipo) {
    return this.httpClient.post<any[]>(`${this.urlFiltrosUsers}`, { tipo: tipo }).toPromise()
  }

  getFavoritos(token) {
    console.log(token)
    return this.httpClient.post<any[]>(`${this.urlFiltros}/listaFav`, { token: token }).toPromise()
  }

}




