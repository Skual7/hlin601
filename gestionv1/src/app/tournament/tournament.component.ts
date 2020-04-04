import { Component, OnInit, Input } from '@angular/core';
import { TournamentService } from '../services/tournament.service';
import { Tournament } from '../models/tournament.interface';

@Component({
  selector: 'app-tournament',
  templateUrl: './tournament.component.html',
  styleUrls: ['./tournament.component.scss']
})
export class TournamentComponent implements OnInit {

  @Input() id: string;
  @Input() nameT: string;
  @Input() format: number; 
  @Input() teamRegistered: number;
  @Input() winner: string; 
  @Input() participe: boolean;

  inscritpion : boolean = false;

  constructor(private tournamentService: TournamentService) { }

  ngOnInit() {
    this.setThisTournament();
    
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
}