import { Component, OnInit } from '@angular/core';
import { TournoiService } from "../services/tournoi.service";
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-tournoi-view',
  templateUrl: './tournoi-view.component.html',
  styleUrls: ['./tournoi-view.component.scss']
})
export class TournoiViewComponent implements OnInit {

  title = 'gestionDeTournois';
  isConnected = false;
  tournois: any[];
  tournoiSubscription: Subscription;

  lastUpdate = new Promise(
    (resolve, reject) => {
      const date = new Date();
      setTimeout( () => { resolve(date);} , 2000 ); //pr simuler D asynchrone
    }
  );

  constructor(private tournoiService : TournoiService){
    setTimeout(
      () => {
        this.isConnected = true;
      }, 2000
    );
  }
  ngOnInit(){
    this.tournoiSubscription = this.tournoiService.tournoiSubject.subscribe(
      (tournois: any[] ) => {
        this.tournois = tournois;
      }
    );
    this.tournoiService.emitTournoiSubject(); 
  }

  onInscrire(){
    this.tournoiService.inscriptionTous();
  }
  onDesinscrire(){
    this.tournoiService.desinscriptionTous();
  }
}
