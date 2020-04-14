import { Component, OnInit, Input } from '@angular/core';
import { EventService } from '../services/event.service';
import { ActivatedRoute } from '@angular/router';
import { TournamentService } from '../services/tournament.service';
import { Subscription } from 'rxjs';
import { Tournament } from '../models/tournament.modele';


@Component({
  selector: 'app-single-event',
  templateUrl: './single-event.component.html',
  styleUrls: ['./single-event.component.scss']
})
export class SingleEventComponent implements OnInit {

  name: string;
  dateEv: string;
  dateLimite: string;
  tournois: any[];
  description: String[];

  Tournaments: Tournament[];

  // descTourn = false;


  constructor(private eventService: EventService,
            private route : ActivatedRoute,
            private tournamentService: TournamentService) { }

  ngOnInit(){
    const name = this.route.snapshot.params['id']; //=nom event
    this.name = this.eventService.getEventByName(name).name;
    this.dateEv = this.eventService.getEventByName(name).dateEv;
    this.dateLimite = this.eventService.getEventByName(name).dateLimite;
    this.tournois = this.eventService.getEventByName(name).tournois;
    this.description = this.eventService.getEventByName(name).description;
    this.Tournaments = this.getTournaments();
  }

  getTournaments(){
    const T : Tournament[] = [];
    this.tournois.forEach(tournoisName => {
        //console.log(tournoisName);
        //console.log(this.tournamentService.getTournamentById(tournoisName+this.dateEv));
        T.push(this.tournamentService.getTournamentById(tournoisName+this.dateEv));
    })
    return T;
  }
  onClickTournament(nameT: string){
    // 
    this.Tournaments = this.getTournaments();
   // console.log(this.currentTournament.id);
  //  this.tournamentService.setTournament(nameT+this.dateEv);
    // this.descTourn = true;
    //console.log(this.tournamentService.tournament);
  }








}

