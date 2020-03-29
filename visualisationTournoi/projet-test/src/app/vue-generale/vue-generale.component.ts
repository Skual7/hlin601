import { Component, OnInit } from '@angular/core';
import { TournoisService } from '../tournois.service';
import { TestObject } from 'protractor/built/driverProviders';

@Component({
  selector: 'app-vue-generale',
  templateUrl: './vue-generale.component.html',
  styleUrls: ['./vue-generale.component.css']
})

export class VueGeneraleComponent implements OnInit {

  constructor(private tournoiService: TournoisService) { }

  ngOnInit(): void {
  }
  rounds=this.tournoiService.getRounds();
  renvoie(){
//    localStorage.clear();
  //  window.location.reload();
    this.tournoiService.tournamentInit("monTournoi");
    this.tournoiService.addRound();
    this.rounds=this.tournoiService.getRounds();
 //   this.tournoiService.addTeam("yooooooo");
   // return this.tournoiService.getTeamNumber(0);
  }

  test(){
    return this.tournoiService.getTeams().length;
  }

}
