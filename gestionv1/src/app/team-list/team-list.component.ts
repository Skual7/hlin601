import { Component, OnInit, OnDestroy } from '@angular/core';
import { Team } from '../models/team.modele';
import { Subscription } from 'rxjs';
import { TeamService } from '../services/team.service';

@Component({
  selector: 'app-team-list',
  templateUrl: './team-list.component.html',
  styleUrls: ['./team-list.component.scss']
})
export class TeamListComponent implements OnInit, OnDestroy {

  teams: Team[];
  teamSubscritpion: Subscription;

  constructor(private teamService: TeamService) { }

  ngOnInit() {
    this.teamSubscritpion = this.teamService.teamSubject.subscribe(
      (teams: Team[]) => {
        this.teams = teams;
      }
    );
    this.teamService.emitTeam();
  }

  ngOnDestroy(){
    this.teamSubscritpion.unsubscribe();
  }

}
