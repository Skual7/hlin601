import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { TeamService } from '../services/team.service';
import { Team } from '../models/team.modele';
import { TournamentService } from '../services/tournament.service';

@Component({
  selector: 'app-new-team',
  templateUrl: './new-team.component.html',
  styleUrls: ['./new-team.component.scss']
})
export class NewTeamComponent implements OnInit {
  // objet formulaire qui correspondra au form ds template
  teamForm: FormGroup;
  // FormuBuilder permet de creer des formGroup plus "lisible"
  constructor(private formBuilder: FormBuilder,
              private teamService: TeamService,
              private tournamentService: TournamentService) { }

  ngOnInit() {
    this.initForm();
  }

  initForm(){
    this.teamForm = this.formBuilder.group( 
      { // on rajoute les controles qui seront dans le formulaires
        teamName: ['',Validators.required],
        players: this.formBuilder.array([]),
        playersLevel: this.formBuilder.array([])
      }
    );
  }
  // pour gérer la validation du formulaire d'ajout de la team
  onSubmitForm(){
    
    const formValue = this.teamForm.value;
    const newTeam = new Team (
      this.tournamentService.tournament.nameT,
      formValue['teamName'],
       formValue['players'] ? formValue['players'] : [],
   //    formValue['playersLevel'] ? formValue['playersLevel']: []
    );
    console.log(newTeam);
  }
  // pour transformer correctement les players
  getPlayers(){
    return this.teamForm.get('players') as FormArray;
  }

/*   getPlayersLevel(){
    return this.teamForm.get('playersLevel') as FormArray;
  } */
  onAddPlayers(){
    const newPlayerControl = this.formBuilder.control('', Validators.required);
    this.getPlayers().push(newPlayerControl);
   
  }
/*   onAddPlayersLevel(){
    const newPlayerLevelControl = this.formBuilder.control('',Validators.required);
    this.getPlayersLevel().push(newPlayerLevelControl);
  } */
  
  /* 
  onDelPlayers(){
    this.getPlayers().removeAt()
  } */

}
