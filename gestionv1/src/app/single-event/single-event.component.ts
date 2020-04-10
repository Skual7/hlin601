import { Component, OnInit, Input } from '@angular/core';
import { EventService } from '../services/event.service';
import { ActivatedRoute } from '@angular/router';
import { TournamentService } from '../services/tournament.service';
import { Subscription } from 'rxjs';
import { Tournament } from '../models/tournament.interface';


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

  currentTournament: Tournament;

  descTourn = false;


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

  }
  onClickTournament(nameT: string){
    // 
    this.currentTournament = this.tournamentService.getTournamentById(nameT+this.dateEv);
   // console.log(this.currentTournament.id);
    this.tournamentService.setTournament(nameT+this.dateEv);
    this.descTourn = true;
    //console.log(this.tournamentService.tournament);
  }










}

