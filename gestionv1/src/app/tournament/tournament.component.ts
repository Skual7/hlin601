import { Component, OnInit, Input } from '@angular/core';
import { TournamentService } from '../services/tournament.service';
import { Tournament } from '../models/tournament.modele';
import { TeamService } from '../services/team.service';
import { Team } from '../models/team.modele';
import { LocalStorageService } from '../services/localstorage.service';

@Component({
  selector: 'app-tournament',
  templateUrl: './tournament.component.html',
  styleUrls: ['./tournament.component.scss']
})
export class TournamentComponent implements OnInit {

  @Input() id: string; // représente idE 
  @Input() nameT: string;
  @Input() format: number; 
  @Input() teamRegistered: string[];
  @Input() winner: string; 
 // @Input() participe: boolean;

  teams: Team[];
  
  inscritpion : boolean = false;
  listerEquipe : boolean = false;

  constructor(private tournamentService: TournamentService,
              private teamService : TeamService, private ls : LocalStorageService) { }

  ngOnInit() {
    this.teams = this.getTeams();
  }


  onClickInscrire(nameT: string){
    if(this.inscritpion) this.inscritpion = !this.inscritpion;
    else this.inscritpion = !this.inscritpion;
    this.ls.addTournament(nameT,this.format);
    
    this.tournamentService.getStringDesTeams(nameT, this.id);
    this.tournamentService.setTournament(nameT); // init tournois courant ds service correspondant
  }
  // gère l'affichage/désaffichage des équipes // 
  displayTeams(){
    
    if(this.listerEquipe) this.listerEquipe = false
    else this.listerEquipe = !this.listerEquipe;
    this.teamRegistered.forEach(name => {
      let x = this.teamService.getTeamByName(name);
     // console.log("Dans duisplaysTEams de tournament: "+x.teamName+" "+x.players+" "+ x.playersLevel);
    });
  }
  // retourne les équipes inscrite au tournois //
  getTeams(){
    const teams : Team[] = [];
    this.teamRegistered.forEach(name => {
      let x = this.teamService.getTeamByName(name);
      teams.push(x);
     // console.log("Dans getTeam() de tournament: "+x.teamName+" "+x.players+" "+ x.playersLevel);
    });
    return teams;
  }
  // retourne le nombre d'équipes incrites // 
  get nbTeam(){
    return this.teamRegistered.length;
  }

}