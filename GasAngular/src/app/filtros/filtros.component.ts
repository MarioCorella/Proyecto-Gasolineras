
import { Component, OnInit, } from '@angular/core';
import { GasService } from '../gas.service';
import { FormGroup, FormControl, } from '@angular/forms';



@Component({
  selector: 'filtros',
  templateUrl: './filtros.component.html',
  styleUrls: ['./filtros.component.css']
})
export class FiltrosComponent implements OnInit {

  provincias: any[]
  municipios: any[]
  gasolineras: any[]

  formSelect: FormGroup

  tipo: string
  arrFiltrado: any[]
  arrOrdenado: any []

  constructor(private gasService: GasService) {
    this.arrFiltrado = []
   }


  ngOnInit() {
    this.gasService.getProvincias().then(result => {
      //console.log(result)
      this.provincias = result
    })

    this.formSelect = new FormGroup({
      provincia: new FormControl(''),
      municipio: new FormControl(''),
    })
  }

  handleProvincia() {
    let provinciaSeleccionada = this.formSelect.value.provincia
    //console.log(provinciaSeleccionada)
    this.gasService.getMunicipios(provinciaSeleccionada).then((result) => {
      this.municipios = result
    })
  }

  recogerFiltros() {
    //console.log(this.formSelect.value)
    this.gasService.getFiltros(this.formSelect.value.provincia, this.formSelect.value.municipio).then((res) => {
     this.gasolineras = res
     this.arrFiltrado = res
    console.log(this.gasolineras)
    })
  }

  filtrarPrecio(){
    this.arrFiltrado = [...this.gasolineras]

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
  }
}

