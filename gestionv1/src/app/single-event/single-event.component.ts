import { Component, OnInit, Input } from '@angular/core';
import { EventService } from '../services/event.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TournamentService } from '../services/tournament.service';
import { Tournament } from '../models/tournament.modele';
import { EventVB } from '../models/event.modele';


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

  singleEvent : EventVB;
  constructor(private eventService: EventService,
            private route : ActivatedRoute,
            private tournamentService: TournamentService,
            private router: Router ){ }

  ngOnInit(){
    const name = this.route.snapshot.params['id']; //=nom event
    if(this.eventService.getEventByNameV2(name) == undefined){
      this.router.navigate(['404']);
    }
    else{
      //console.log(this.eventService.events);
      console.log("dans single");
      this.name = this.eventService.getEventByNameV2(name).name;
      this.dateEv = this.eventService.getEventByNameV2(name).dateEv;
      this.dateLimite = this.eventService.getEventByNameV2(name).dateLimite;
      this.tournois = this.eventService.getEventByNameV2(name).tournois;
      this.description = this.eventService.getEventByNameV2(name).description
      this.Tournaments = this.eventService.getTournamentsFromString(name);
      
    }
    
  }

  onClickTournament(nameT: string){
    //this.Tournaments = this.tournamentService.getTournaments(this.tournois, this.dateEv);
    this.tournamentService.name = nameT;
  }








}

