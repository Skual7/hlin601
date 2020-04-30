import { Component, OnInit, Input } from '@angular/core';
import { EventService } from '../services/event.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TournamentService } from '../services/tournament.service';
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
            private tournamentService: TournamentService,
            private router: Router ){ }

  ngOnInit(){
    const name = this.route.snapshot.params['id']; //=nom event
    
    if(this.eventService.getEventByName(name) == undefined){
      this.router.navigate(['404']);
    }
    else{
      this.name = this.eventService.getEventByName(name).name;
      this.dateEv = this.eventService.getEventByName(name).dateEv;
      this.dateLimite = this.eventService.getEventByName(name).dateLimite;
      this.tournois = this.eventService.getEventByName(name).tournois;
      this.description = this.eventService.getEventByName(name).description;
      let idE = this.eventService.getIdForEvent(this.name, this.dateEv, this.dateLimite);
      //this.tournamentService.getTournaments(this.tournois, this.dateEv);
      this.Tournaments = this.tournamentService.getTFromBddByIde(idE);
      
    
    }
    
  }

  onClickTournament(nameT: string){
    this.Tournaments = this.tournamentService.getTournaments(this.tournois, this.dateEv);
  }








}

