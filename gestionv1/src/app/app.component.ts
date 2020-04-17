import { Component, OnInit } from '@angular/core';
import { EventService } from './services/event.service';
import { ConnectionService } from './services/connection.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  
  title = 'gestionv1';
  constructor(private connectionService: ConnectionService){}



}
