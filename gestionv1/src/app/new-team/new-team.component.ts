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
      });
   //this.teamForm.valueChanges.subscribe(console.log); // pr voir saisie au fur et à mesure (pas nécessaire)
  }

  // pour gérer la validation du formulaire + création team // 
  onSubmitForm(){   
    const formValue = this.teamForm.value;
    const newTeam = new Team (
      this.tournamentService.tournament.id,
      formValue['teamName'],
      this.extPlayers()
    );
    console.log(newTeam);
   this.teamService.addTeam(newTeam);

  }
  // pour transformer correctement les players // 
  getPlayers(){
    return this.teamForm.get('players') as FormArray;
  }
  // Pour rajouter des joueurs au formulaire lors du click sur ajouter Joueur //
  onAddPlayer(){
    const player = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.pattern('[A-Za-z]+')]],
      level: [null, [Validators.required,Validators.minLength(1),Validators.maxLength(1),Validators.min(0),Validators.max(5)] ]
    });
    this.getPlayers().push(player);
  }
  // pour supprimer des joueurs dans formulaire // 
  onDeletePlayer(i){
    this.getPlayers().removeAt(i);
  }

  // pour extraire les joueurs du formulaires // 
  extPlayers(){
    const formValues = this.teamForm.value;
    const players : any[] = [];
    formValues['players'].forEach( p => {
      players.push( [p.name,p.level]);
    });
    return players;
  }
  //////////////////////////////////////////////////////////////////////
  ////////// ----- Pour vérifier l'intégrité des données -----//////////
  //////////////////////////////////////////////////////////////////////
  
  get teamName() { // nouvelle syntaxe plus "jolie"
    return this.teamForm.get('teamName');
  }
  get name(){
    return this.teamForm.get('name');
  }

  // savoir le nombre minimum de joueur à ajouter avant validation formulaire //
  // pas encore utilisé pour l'instant                                        // 
  getNbMinPlayers(){
    return this.tournamentService.tournament.format;

  }


}
