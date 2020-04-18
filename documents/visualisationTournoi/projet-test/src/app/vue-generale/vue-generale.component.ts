import { Component, OnInit } from '@angular/core';
import { TournoisService } from '../tournois.service';
import { TestObject } from 'protractor/built/driverProviders';
import * as $ from 'jquery'

@Component({
  selector: 'app-vue-generale',
  templateUrl: './vue-generale.component.html',
  styleUrls: ['./vue-generale.component.css']
})

export class VueGeneraleComponent implements OnInit {

  tournoiService;
  constructor() { }

  ngOnInit(): void {
  }

  rounds;

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

  renvoie(){
    this.tournoiService = new TournoisService();
    this.tournoiService.addTournament("coucou");
    this.tournoiService.addTeam("coucou",'Dragons Bleus');
    this.tournoiService.addTeam("coucou",'Dragons Rouge');
    this.tournoiService.addRound("coucou");
    this.tournoiService.addPoolToRound("coucou",0);
    this.tournoiService.addTeamToPool("coucou",'Dragons Bleus',0,0);
    this.tournoiService.addTeamToPool("coucou",'Dragons Rouge',0,0);
    this.rounds=this.tournoiService.getRounds("coucou");
  }

  ajout(){
    this.tournoiService.addRound("coucou");
    this.rounds=this.tournoiService.getRounds("coucou");
  }

  test(){
    return this.tournoiService.getTeams("coucou").length;
  }

}
