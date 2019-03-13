import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators  } from '@angular/forms';
import { GasService } from '../gas.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'registro-usuarios',
  templateUrl: './registro-usuarios.component.html',
  styleUrls: ['./registro-usuarios.component.css']
})
export class RegistroUsuariosComponent implements OnInit {

  formRegistro: FormGroup
  aviso: string

  constructor(private gasService: GasService,
              private router: Router) {}

  ngOnInit() {
    this.formRegistro = new FormGroup({
      nombre: new FormControl('', [
        Validators.required
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z]\w{3,14}$/)  
      ]),
    }, )
  }

  handleRegistro() {
    this.gasService.enviarDatosReg(this.formRegistro.value).then((res)=>{
      console.log(res)
       //console.log(res['affectedRows'])
       if(res['affectedRows'] != 0){
        this.router.navigate(['/zona_usuarios'])
       }else{
         this.router.navigate(['/registro'])
          this.aviso = 'La dirección de correo introducida ya estaba registrada'
       }
    })
   

    


    
  }
}
