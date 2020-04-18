import { Component, OnInit, OnDestroy } from '@angular/core';
//import { resolve } from 'url';
//import { TournoiService } from './services/tournoi.service';
import { Observable } from 'rxjs/Observable';
import { Subscription } from "rxjs/Subscription";
import 'rxjs/Rx';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit, OnDestroy {
  secondes: number;
  counterSubscription: Subscription;


  constructor() {}
  ngOnInit(){
    const counter = Observable.interval(1000); // crée obs qui emetra chifre ttes les seconde
    this.counterSubscription = counter.subscribe(
      (value: number) => { this.secondes = value;}
    );
  }
  ngOnDestroy(){
    this.counterSubscription.unsubscribe(); // pr eviter pb de comportement inf
  }

  /*
  title = 'gestionDeTournois'; isConnected = false; tournois: any[];
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
    this.tournois = this.tournoiService.tournois;
  }
  onInscrire(){
    this.tournoiService.inscriptionTous();
  }
  onDesinscrire(){
    this.tournoiService.desinscriptionTous();
  }
  */

}
