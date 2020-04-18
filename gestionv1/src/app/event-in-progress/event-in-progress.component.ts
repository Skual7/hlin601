import { Component, OnInit } from '@angular/core';
import { Tournament } from '../models/tournament.modele';
import { Team } from '../models/team.modele';
import { EventService } from '../services/event.service';
import { TournamentService } from '../services/tournament.service';
import { TeamService } from '../services/team.service';
import { EventVB } from '../models/event.modele';
import { ActivatedRoute } from '@angular/router';
import { LocalStorageService } from '../services/localstorage.service';

@Component({
  selector: 'app-event-in-progress',
  templateUrl: './event-in-progress.component.html',
  styleUrls: ['./event-in-progress.component.scss']
})
export class EventInProgressComponent implements OnInit {
  ///////////////////////////////////////////////
  ////////// PARTIE NON LOCALE STORAGE //////////
  /////////////////////////////////////////////// 
  event: EventVB;
  tournaments: Tournament[];
  teams : Team[];
  constructor(private eventService: EventService,
              private tournamentService: TournamentService, 
              private teamService : TeamService,
              private route : ActivatedRoute,
              private localStorageService: LocalStorageService){}
  ngOnInit() {
    if(this.valide()){
        this.event = this.eventService.getEventByName(this.route.snapshot.params['name']);
        //console.log(this.event); // ok 
        this.tournaments = this.tournamentService.getTournaments(this.event.tournois, this.event.dateEv);
        //console.log(this.tournaments); 
        let t  = [];
        this.tournaments.forEach(tournament => {
          tournament.teamRegistered.forEach(team => {
            t.push(this.teamService.getTeamByName(team))
          });
        });
        this.teams = t; //console.log(this.teams);
    }
     
  }
  valide(){
    if(this.route.snapshot.params['name'] == ':name') console.log("== :name ");
    if(this.route.snapshot.params['name'] == null) console.log( "== null ");
    if (this.route.snapshot.params['name'] == undefined) console.log("== undefined");
    return !(this.route.snapshot.params['name'] == ':name' || this.route.snapshot.params['name'] == null || this.route.snapshot.params['name'] == undefined);
  }
  //////////////////////////////////////////////////////////
  ////////// PARTIE TRANSFERT DANS LOCALE STORAGE //////////
  //////////////////////////////////////////////////////////

  startLocalStorage(){
    this.initLocalStorage();
    this.localStorageService.setLocal();
  }
  clearLocalStorage(){
    window.localStorage.setItem('tournament',JSON.stringify({'':['',[],[]]}));
    this.localStorageService.setLocal();
  }
  initLocalStorage(){
    // ajout des tournois dans le localstorage //
    this.tournaments.forEach( tournament => {
      this.localStorageService.addTournament(tournament.nameT , tournament.format);
      // ajout des teams dans le localstorage
      tournament.teamRegistered.forEach(team => {
        this.localStorageService.addTeam(tournament.nameT,team);
      });
    });
    // ajout des joueurs dans le localstorage   
    this.teams.forEach(team => {
      //  -8 = - dateEvent en gros on split l'id pour récupérer le nom du tournois
      let tournamentName = team.tournamentid.slice(0, team.tournamentid.length - 8);
      team.players.forEach( (player) => {
        this.localStorageService.addPlayer(tournamentName,team.teamName,player[0],player[1])
      });
    }); 

      
      


  }


}
