import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AccesoUsuarioGuard implements CanActivate {

  constructor(private router: Router){

  }


  canActivate(){
      let tokenOk = localStorage.getItem('Token')
      console.log(tokenOk)
       if(tokenOk){ 
        return true;
       } else{
         this.router.navigate(['/login'])
         return false;
       }
  } 
}
