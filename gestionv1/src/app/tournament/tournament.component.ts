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
 //   this.teams2 = this.tournamentService.getStringDesTeams(this.nameT,this.id);
    this.teams = this.getTeams();
  }


  onClickInscrire(nameT: string){
    if(this.inscritpion) this.inscritpion = !this.inscritpion;
    else this.inscritpion = !this.inscritpion;
    console.log("Dans OnclickInscrire " + this.id);
    this.tournamentService.name = nameT;
    this.tournamentService.id = this.id;
  }
  // gère l'affichage/désaffichage des équipes // 
  displayTeams(){
    if(this.listerEquipe) this.listerEquipe = false
    else this.listerEquipe = !this.listerEquipe;
    this.teamRegistered.forEach(name => {
      let x = this.teamService.getTeamByName(name);
    });
  }
  // retourne les équipes inscrite au tournois //
  getTeams(){
    const teams : Team[] = [];
    this.teamRegistered.forEach(name => {
      let x = this.teamService.getTeamByName(name);
      teams.push(x);
    });
    return teams;
  }
  // retourne le nombre d'équipes incrites // 
  get nbTeam(){
    return this.teamRegistered.length;
  }

}