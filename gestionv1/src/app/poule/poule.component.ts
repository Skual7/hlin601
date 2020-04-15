import { Component, OnInit, Input } from '@angular/core';
import { TournamentService } from '../services/tournament.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-poule',
  templateUrl: './poule.component.html',
  styleUrls: ['./poule.component.scss']
})
export class PouleComponent implements OnInit {
  @Input() teamArray: Array<object>;
  constructor(private tournamentService: TournamentService, private route : ActivatedRoute) {
   }

  name="";

  getTeamName(num){
    var teamName='';
    let t=this.tournamentService.getTeam(this.name,num);
    teamName = t[0];
    
    return teamName;
  }

  ngOnInit(): void {
    this.name = this.route.snapshot.params['trn'];
  }

}
