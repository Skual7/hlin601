import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LocalStorageService } from '../services/localstorage.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Tournament } from '../models/tournament.modele';


@Component({
  selector: 'app-poule',
  templateUrl: './poule.component.html',
  styleUrls: ['./poule.component.scss']
})
export class PouleComponent implements OnInit {
  
  @Input() teamArray: Array<object>;
  @Input() numRound: number;
  @Input() numPoule: number;

  constructor(private fb : FormBuilder, private localStorageService:  LocalStorageService, private route : ActivatedRoute) {
   }

  name="";
  form : FormGroup;
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
      }
    )
    this.displayForm = false;
    this.displayForm2 = false;
  }

  addT(){
    this.displayForm = true;
  }

  onSubmit(){
    this.localStorageService.addTeam(this.name, this.form.value.nameF);
    this.localStorageService.addTeamToPool(this.name, this.form.value.nameF, this.numRound, this.numPoule);
    console.log("j'ajoute la team "+this.form.value.nameF+" à la poule numero "+this.numPoule+" du round numero "+this.numRound)
    this.teamArray =  this.localStorageService.getTeamsFromPool(this.name, this.numRound, this.numPoule);
  }

}
