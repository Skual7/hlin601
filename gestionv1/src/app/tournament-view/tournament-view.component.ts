import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../services/localstorage.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-vue-generale',
  templateUrl: './tournament-view.component.html',
  styleUrls: ['./tournament-view.component.scss']
})

export class TournamentViewComponent implements OnInit {

  constructor(private route : ActivatedRoute, private localStorageService : LocalStorageService,
            private router : Router) { }
  // nameEv = "";
  name ="";

  ngOnInit(): void {
      this.name = this.route.snapshot.params['trn'];
  //   this.nameEv = this.route.snapshot.params['name'];
  }
  
  rounds = this.localStorageService.getRounds(this.name);

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
    this.localStorageService.addRound(this.name);
    this.rounds = this.localStorageService.getRounds(this.name);
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
