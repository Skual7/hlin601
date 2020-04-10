import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { TeamService } from '../services/team.service';
import { Team } from '../models/team.modele';
import { TournamentService } from '../services/tournament.service';
import { UserService } from '../services/user.service';

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
              private tournamentService: TournamentService,
              private userService : UserService
              ) { }

  ngOnInit() {
    this.initForm();
  }

  ///////////////////////////////////
  ////// GESTION DU FORMULAIRE //////
  ///////////////////////////////////
  // Pour initialiser le formulaire // 
  initForm(){
    this.teamForm = this.formBuilder.group({ // on rajoute les controles qui seront dans le formulaires
        teamName: ['',[Validators.required,Validators.minLength(5),Validators.maxLength(20), Validators.pattern('[A-Za-z0-9]+')]],
        players: this.formBuilder.array([]),
        selfInsc: [false]
      }
    );
   // this.teamForm.valueChanges.subscribe(console.log); // pr voir saisie au fur et à mesure (pas nécessaire)
  }

  // pour gérer la validation du formulaire + création team
  onSubmitForm(){   
    const formValue = this.teamForm.value;
    const newTeam = new Team (
      this.tournamentService.tournament.id,
      formValue['teamName'],
       this.extPlayersName(),
       this.extPlayersLevel()
    );
    console.log(newTeam);
  }
  // pour transformer correctement les players // 
  getPlayers(){
    return this.teamForm.get('players') as FormArray;
  }
  // Pour rajouter des elts au formulaire lors du click sur ajouter Joueur //
  onAddPlayer(){
    const player = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.pattern('[A-Za-z]+')]],
      level: [null, [Validators.required,Validators.minLength(1),Validators.maxLength(1),Validators.min(0),Validators.max(5)] ]
    });
    this.getPlayers().push(player);
  }
  // pour supprimer des joueurs // 
  onDeletePlayer(i){
    this.getPlayers().removeAt(i);
  }

  // pour extraire le tableau des niveaux du form dans un array seul // 
  extPlayersLevel(){ 
    const formValues = this.teamForm.value;
    const levels : number[] = [];
    formValues['players'].forEach(element => {
      levels.push( +element['level']);//  + pour convertir string -> int 
    });
    if(formValues['selfInsc']){
      levels.push(this.userService.user.niveau);
    }
    return levels;
  }
  // pour extraites les noms des joueurs du form dans array seul //
  extPlayersName(){
    const formValues = this.teamForm.value;
    const names : string[] = [];
    formValues['players'].forEach( elt => {
      names.push(elt['name']);
    })
    if(formValues['selfInsc']){
      names.push(this.userService.user.firstName);
    } 
    return names;
  }


  // ----- Pour vérifier l'intégrité des données ----- //
  get teamName() { // nouvelle syntaxe plus "jolie"
    return this.teamForm.get('teamName');
  }
  get name(){
    return this.teamForm.get('name');
  }

  // savoir le nombre minimum de joueur à ajouter avant validation formulaire //
  getNbMinPlayers(){
    return this.tournamentService.tournament.format;

  }

}
