import { Component, OnInit, Input, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LocalStorageService } from '../services/localstorage.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Tournament } from '../models/tournament.modele';
//import { EventEmitter } from 'events';
import { EventEmitter } from '@angular/core'; 



@Component({
  selector: 'app-poule',
  templateUrl: './poule.component.html',
  styleUrls: ['./poule.component.scss']
})
export class PouleComponent implements OnInit {
  
  @Input() numRound: number;
  @Input() numPoule: number;
  @Output() refreshPool = new EventEmitter();

  constructor(private fb : FormBuilder, private localStorageService:  LocalStorageService, private route : ActivatedRoute) {
   }

  teamArray: Array<object>
  name="";
  form : FormGroup;
  form2: FormGroup;
  displayForm: boolean;
  displayForm2: boolean;

  getTeamName(num){
    var teamName='';
    let t=this.localStorageService.getTeam(this.name,num);
    teamName = t[0];
    
    return teamName;
  } 

  ngOnInit(): void {
    this.name = this.route.snapshot.params['trn'];
    this.form = this.fb.group(
      {
        nameF : '',
        niveau: undefined
      }
    )
    this.form2 = this.fb.group(
      {
        numPool : undefined
      }
    )
    this.displayForm = false;
    this.displayForm2 = false;
    this.teamArray = this.localStorageService.getTeamsFromPool(this.name, this.numRound, this.numPoule);
  }

  fctCmp(team1, team2){
    return (this.localStorageService.calcTeamPoolMatchWin(this.name, this.numRound, team2)- (this.localStorageService.calcTeamPoolMatchWin(this.name, this.numRound, team1)));
  }

  addT(){
    this.displayForm = !this.displayForm;
  }

  changeTeam(team){
    this.localStorageService.moveTeamFromPool(this.name, this.numRound, team, this.form2.value.numPool);
    this.teamArray = this.localStorageService.getTeamsFromPool(this.name, this.numRound, this.numPoule);
    this.refreshPool.emit(null);
  }

  onSubmit(){
    this.localStorageService.addTeam(this.name, this.form.value.nameF);
    this.localStorageService.setTeamLevel(this.name, this.form.value.nameF, this.form.value.niveau);
    this.localStorageService.addTeamToPool(this.name, this.form.value.nameF, this.numRound, this.numPoule);
    console.log("j'ajoute la team "+this.form.value.nameF+" à la poule numero "+this.numPoule+" du round numero "+this.numRound)
    this.teamArray =  this.localStorageService.getTeamsFromPool(this.name, this.numRound, this.numPoule);
    this.displayForm = false;
  }

  deleteT(teamN){
    this.localStorageService.suprTeamFromPool(this.name, this.numRound, teamN);
    this.teamArray = this.localStorageService.getTeamsFromPool(this.name, this.numRound, this.numPoule);
  }

  deleteP(){
    this.localStorageService.suprPool(this.name, this.numRound, this.numPoule);
    this.refreshPool.emit(null);
  }

}
