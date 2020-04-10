import { Component, OnInit, Input } from '@angular/core';
import { TournamentService } from '../services/tournament.service';
import { Tournament } from '../models/tournament.interface';
import { TeamService } from '../services/team.service';
import { ThrowStmt } from '@angular/compiler';

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

  
  inscritpion : boolean = false;
  listerEquipe : boolean = false;
  constructor(private tournamentService: TournamentService,
              private teamService : TeamService) { }

  ngOnInit() {
    this.setThisTournament();
    console.log('bordel ngOnInit se fait qu une fois dans tournamentComponents');
  
  }

  setThisTournament(){
    this.id = this.tournamentService.tournament.id;
    this.nameT = this.tournamentService.tournament.nameT;
    this.format = this.tournamentService.tournament.format;
    this.teamRegistered = this.tournamentService.tournament.teamRegistered;
    this.winner = this.tournamentService.tournament.winner;
    this.participe = this.tournamentService.tournament.participe;
  }
  onClickInscrire(){
    this.inscritpion = true;
  }

  
  displayTeams(){
    console.log('dans displayTEams de tournamentcompo');
    this.teamService.tournamentid = this.id;
    this.listerEquipe = true;
  
  }
  get NbTeamRegistered(){
    return this.teamRegistered.length;
  }

}