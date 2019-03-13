import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


import { AppComponent } from './app.component';
import { FiltrosComponent } from './filtros/filtros.component';
import { InicioComponent } from './inicio/inicio.component';
import { LoginComponent } from './login/login.component';
import { RankingComponent } from './ranking/ranking.component';
import { RegistroUsuariosComponent } from './registro-usuarios/registro-usuarios.component';
import { ZonaUsuariosComponent } from './zona-usuarios/zona-usuarios.component';
import { EditaUsuarioComponent } from './edita-usuario/edita-usuario.component';
import { VistaRankingComponent } from './vista-ranking/vista-ranking.component';

@NgModule({
  declarations: [
    AppComponent,
    FiltrosComponent,
    InicioComponent,
    LoginComponent,
    RankingComponent,
    RegistroUsuariosComponent,
    ZonaUsuariosComponent,
    EditaUsuarioComponent,
    VistaRankingComponent
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
