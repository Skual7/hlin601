import { Component } from '@angular/core';
import { TournoisService } from './tournois.service';
import { QualifServiceService } from './qualif-service.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'projet-test';
  tournois:any[];
  tournoisService;
  constructor(/*private tournoisService: TournoisService*/){}

  ngOnInit(): void {
    if(window.localStorage.getItem('tournament') == null){
      window.localStorage.setItem('tournament',JSON.stringify({'':['',[],[]]}));
    }
  }

  clearStorage(){
      localStorage.clear();
      window.location.reload();
  }
}
