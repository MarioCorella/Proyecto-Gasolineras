import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';





@Injectable({
  providedIn: 'root'
})
export class GasService {
 
  urlReg ="http://localhost:3000/api/usuarios/create";
  urlLogin = "http://localhost:3000/api/login/access";
  urlGas = "http://gasextractor.herokuapp.com/api/station/40.42244931586505/-3.7025214224808165/1000"
  urlEditaUsuario = "http://localhost:3000/api/usuarios/edit"
  urlFiltroProvincia = "http://localhost:3000/api/filtros/provincias/";
  urlFiltroMunicipio = "http://localhost:3000/api/filtros/municipios/";
  urlFiltros = "http://localhost:3000/api/filtros";
  urlRanking = "http://localhost:3000/api/filtros/ranking"

  constructor(private httpClient: HttpClient){}

  enviarDatosReg(userData){
    return this.httpClient.post<any[]>(`${this.urlReg}`, userData).toPromise()
  }

  comprobarLogin(loginData){
    return this.httpClient.post<any[]>(`${this.urlLogin}`, loginData).toPromise()
  }

  getGasolinerasLocalizacion(lat, long, radio){
    return this.httpClient.get<any[]>(`https://gasextractor.herokuapp.com/api/station/${lat}/${long}/${radio}`).toPromise()
  }

  getFiltros(provincia, municipio){
    return this.httpClient.post<any[]>(`${this.urlFiltros}`, {
      provincia: provincia,
      municipio: municipio
    }).toPromise()
  }

  getProvincias(){
    return this.httpClient.get<any[]>(`${this.urlFiltroProvincia}`).toPromise()
  }

  getMunicipios(provincia){
    //console.log(provincia)
    return this.httpClient.post<any[]>(`${this.urlFiltroMunicipio}`, {provincia: provincia}).toPromise()
  }

  getRanking(){
    return this.httpClient.get<any[]>(`${this.urlRanking}`).toPromise()
  }

  getUsuario(token){
    return this.httpClient.post<any[]>(`${this.urlEditaUsuario}`,{token: token}).toPromise()
  }
 
}




