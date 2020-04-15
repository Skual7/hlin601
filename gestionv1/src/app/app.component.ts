import { Component, OnInit } from '@angular/core';
import { EventService } from './services/event.service';
import { ConnectionService } from './services/connection.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  ngOnInit(): void {
    if(window.localStorage.getItem('tournament') == null){
      window.localStorage.setItem('tournament',JSON.stringify({'':['',[],[]]}));
    }
  }
  
  title = 'gestionv1';
  constructor(private connectionService: ConnectionService){}



}
