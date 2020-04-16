import { Component, OnInit } from '@angular/core';
import { TournamentService } from '../services/tournament.service';
import { TestObject } from 'protractor/built/driverProviders';
import * as $ from 'jquery'
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-vue-generale',
  templateUrl: './tournament-view.component.html',
  styleUrls: ['./tournament-view.component.scss']
})

export class TournamentViewComponent implements OnInit {

  constructor(private route : ActivatedRoute, private tournamentService : TournamentService) { }
  name ="";
  ngOnInit(): void {
    this.name = this.route.snapshot.params['trn'];
  }

  rounds = this.tournamentService.getRounds(this.name);

  monStyle(){
    let taille = 100/this.rounds.length
    console.log(100/this.rounds.length)
    return {
      'width': taille+'%',
      'height': '100%',
      'display':'inline-block',
      'text-align':'center'
    }
  }

  addR(){
    this.tournamentService.addRound(this.name);
    this.rounds = this.tournamentService.getRounds(this.name);
  }

  /*renvoie(){
    this.tournamentService.addTournament(this.name,3);
    this.tournamentService.addTeam(this.name,'Dragons Bleus');
    this.tournamentService.addTeam(this.name,'Dragons Rouge');
    this.tournamentService.addRound(this.name);
    this.tournamentService.addPoolToRound(this.name,0);
    this.tournamentService.addTeamToPool(this.name,'Dragons Bleus',0,0);
    this.tournamentService.addTeamToPool(this.name,'Dragons Rouge',0,0);
    this.rounds=this.tournamentService.getRounds(this.name);
    console.log("je suis le nom "+this.name)
  }*/

  /*ajout(){
    this.tournamentService.addRound(name);
    this.rounds=this.tournamentService.getRounds(name);
  }*/

}
