import { Component, OnInit, Input } from '@angular/core';
import { TournoisService } from '../tournois.service';

@Component({
  selector: 'app-poule',
  templateUrl: './poule.component.html',
  styleUrls: ['./poule.component.css']
})
export class PouleComponent implements OnInit {
  @Input() teamArray: Array<object>;
  constructor(/*private tournoiService: TournoisService*/) {
   }
   tournoiService = new TournoisService;
  getTeamName(num){
    var teamName='';
    let t=this.tournoiService.getTeam("coucou",num);
    teamName = t[0];
    
    return teamName;
  }

  ngOnInit(): void {
  }

}
