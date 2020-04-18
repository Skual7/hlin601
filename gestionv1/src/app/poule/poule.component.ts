import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LocalStorageService } from '../services/localstorage.service';

@Component({
  selector: 'app-poule',
  templateUrl: './poule.component.html',
  styleUrls: ['./poule.component.scss']
})
export class PouleComponent implements OnInit {
  
  @Input() teamArray: Array<object>;
  constructor(private localStorageService:  LocalStorageService, private route : ActivatedRoute) {
   }

  name="";

  getTeamName(num){
    var teamName='';
    let t=this.localStorageService.getTeam(this.name,num);
    teamName = t[0];
    
    return teamName;
  } 

  ngOnInit(): void {
    this.name = this.route.snapshot.params['trn'];
  }

}
