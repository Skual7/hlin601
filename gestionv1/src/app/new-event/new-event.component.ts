import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { EventVB } from "../models/event.modele";
import { EventService } from '../services/event.service';
import { TournamentService } from '../services/tournament.service';
import { Tournament } from '../models/tournament.modele';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-event',
  templateUrl: './new-event.component.html',
  styleUrls: ['./new-event.component.scss']
})
export class NewEventComponent implements OnInit {

  // objet forulaire qui correspond au formulaire // 
  eventForm : FormGroup;

  constructor(private formBuilder: FormBuilder, private eventService: EventService,
              private tournamentService : TournamentService, private router: Router) { }

  ngOnInit() {
    this.initForm();
  }

  // Méthode d'initialisation du formulaire//
  initForm(){
    this.eventForm = this.formBuilder.group({
      name: ['',[Validators.required]],
      dateEv: ['',[Validators.required]],
      dateLimite: ['',[Validators.required]],
      tournaments: this.formBuilder.array([]),
      description: ['',[Validators.required]]
    });
   // this.eventForm.valueChanges.subscribe(console.log);
  }

  // retourne le tableau de tournois correctement formé // 
  getTournaments(){
    return this.eventForm.get('tournaments') as FormArray;
  }

  // permet d'ajouter un tournois au formulaire  //
  // lors du click sur ajouter Tournois //
  onAddTournament(){
    const tournament = this.formBuilder.group({
      nameT: ['',[Validators.required]],
      format: ['',[Validators.required]]
    });
    this.getTournaments().push(tournament);
  }

  // Permet de supprimer un tournois du formulaire //
  onDeleteTournament(i){
    this.getTournaments().removeAt(i);
  }

  // crée les tournois et les events de manière séparé //
  // et par la suite devra ajouter ces deux à la BDD //
  onSubmitForm(){
    const formValue = this.eventForm.value;
     const newEvent = new EventVB(
      formValue['name'],
      formValue['dateEv'],
      formValue['dateLimite'],
      this.getTournamentName(),
      formValue['description']
    );
    console.log(newEvent);
    this.eventService.addEvent(newEvent); // ajoute ev à BDD
    this.makeAndAddTournaments();
    this.router.navigate(['/events']);

  }
  // retourne un tableau avec les noms des tournois pour l'event //
  getTournamentName(){
    const formValues = this.eventForm.value;
    const tournaments: string[] = [];
    formValues['tournaments'].forEach(t => {
      tournaments.push(t['nameT']);
    });
    return tournaments;
  }
  // s'occupe de créer les tournois entièrement puis les ajoute à la BDD //
  makeAndAddTournaments(){
    const formValues = this.eventForm.value;
    formValues['tournaments'].forEach( t => {
      this.tournamentService.addTournament(new Tournament ( t['nameT']+formValues['dateEv'], 
      t['nameT'], t['format'] as number, [],"" ));
    });
  }

}