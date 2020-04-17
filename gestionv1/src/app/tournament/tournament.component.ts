import { Component, OnInit, Input } from '@angular/core';
import { TournamentService } from '../services/tournament.service';
import { Tournament } from '../models/tournament.modele';
import { TeamService } from '../services/team.service';
import { ThrowStmt } from '@angular/compiler';
import { Team } from '../models/team.modele';

@Component({
  selector: 'app-tournament',
  templateUrl: './tournament.component.html',
  styleUrls: ['./tournament.component.scss']
})
export class TournamentComponent implements OnInit {

  @Input() id: string;
  @Input() nameT: string;
  @Input() format: number; 
  @Input() teamRegistered: string[];
  @Input() winner: string; 
  @Input() participe: boolean;

  teams: Team[];
  
  inscritpion : boolean = false;
  listerEquipe : boolean = false;

  constructor(private tournamentService: TournamentService,
              private teamService : TeamService) { }

  ngOnInit() {
    this.teams = this.getTeams();
  }


  onClickInscrire(id: string){
    if(this.inscritpion) this.inscritpion = !this.inscritpion;
    else this.inscritpion = !this.inscritpion;
    this.tournamentService.setTournament(id); // init tournois courant ds service correspondant
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