import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { FiltrosComponent } from './filtros/filtros.component';
import { RankingComponent } from './ranking/ranking.component';
import { RegistroUsuariosComponent } from './registro-usuarios/registro-usuarios.component';
import { LoginComponent } from './login/login.component';
import { ZonaUsuariosComponent } from './zona-usuarios/zona-usuarios.component';
import { EditaUsuarioComponent } from './edita-usuario/edita-usuario.component';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/'},
  { path: 'inicio', component: InicioComponent },
  { path: 'filtros', component: FiltrosComponent},
  { path: 'ranking', component: RankingComponent},
  { path: 'registro', component: RegistroUsuariosComponent},
  { path: 'login', component: LoginComponent},
  { path: 'zona_usuarios', component: ZonaUsuariosComponent},
  { path: 'edita-usuario', component: EditaUsuarioComponent},
  { path: '**', component: InicioComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
