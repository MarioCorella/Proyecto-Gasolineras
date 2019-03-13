import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GasService } from '../gas.service';

@Component({
  selector: 'app-edita-usuario',
  templateUrl: './edita-usuario.component.html',
  styleUrls: ['./edita-usuario.component.css']
})





export class EditaUsuarioComponent implements OnInit {

  tokenUsuario: any
  dataUsuarioEdit: any[]
  formEdita: FormGroup;

  constructor(private gasService: GasService) {

  }

  ngOnInit() {
    this.tokenUsuario = localStorage.getItem('Token')
    //console.log(this.tokenUsuario)
    this.gasService.getUsuario(this.tokenUsuario).then((res) => {
      this.dataUsuarioEdit = res
      //console.log(this.dataUsuarioEdit)
    })


    this.formEdita = new FormGroup({
      nombre: new FormControl('', [
        Validators.required
      ]),
      email: new FormControl('', [
        Validators.required
      ])
    })
  }

  handleEditaUsuario(){
    console.log(this.formEdita.value)
    // this.gasService.editaUsuario(this.formEdita.value)
  }




}
