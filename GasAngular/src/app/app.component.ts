import { Component } from '@angular/core';
import { GasService } from './gas.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Gas';
  constructor(public gasService: GasService){}

  
}

