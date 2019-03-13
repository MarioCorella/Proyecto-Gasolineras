import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GasService } from '../gas.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
 
  formLogin: FormGroup
  constructor(private gasService: GasService,
              private router: Router) { }


    

  ngOnInit() {
    this.formLogin = new FormGroup({
      nombre: new FormControl('', [
        Validators.required
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z]\w{3,14}$/)
      ]),
    }, )
  }

  handleFormulario(){
    this.gasService.comprobarLogin(this.formLogin.value).then((res)=>{
      if(res['token']){
        localStorage.setItem('Token', res['token'])
        this.router.navigate(['/zona_usuarios'])
       }else if(res['error']){
         alert('El usuario y/o la contraseña no son correctos')      
       }
    })
  }
 
   
    

}
// if(res['error']){
//   this.router.navigate(['/login'])
//  }else if(res['token']){
//    console.log(res)
//   this.router.navigate(['/zona_usuarios'])
//  }