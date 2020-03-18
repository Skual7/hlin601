import { Component } from '@angular/core';
import { TournoisService } from './tournois.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'projet-test';
  tournois:any[];

  constructor(private tournoisService: TournoisService){}

  ngOnInit(): void {
  }

  clearStorage(){
      localStorage.clear();
      window.location.reload();
  }

  tournoisStart(){
    this.tournoisService.tournamentInit('Tournois du Samedi Soir');
  }
}
