import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GasService } from '../gas.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edita-usuario',
  templateUrl: './edita-usuario.component.html',
  styleUrls: ['./edita-usuario.component.css']
})


export class EditaUsuarioComponent implements OnInit {

  id: number
  tokenUsuario: any
  dataUsuarioEdit: any[]
  formEdita: FormGroup;
  actualizado: any[]

  constructor(private gasService: GasService,
    private router: Router) {
  }

  ngOnInit() {

    this.tokenUsuario = localStorage.getItem('Token')
    this.gasService.getUsuario(this.tokenUsuario).then((res) => {
      //console.log(res)
      this.dataUsuarioEdit = res
      this.id = res['id']

      this.formEdita = new FormGroup({
        nombre: new FormControl(res['nombre'], [
          Validators.required
        ]),
        email: new FormControl(res['email'], [
          Validators.required
        ])
      })
    })
  }

  handleEditaUsuario() {
    this.gasService.editaUsuario(
      this.id,
      this.formEdita.value.nombre,
      this.formEdita.value.email,
    ).then((res) => {
      this.actualizado = res
      if (res) {
        this.router.navigate(['/zona_usuarios'])
      }
    })
  }


}























