import { Component, OnInit, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { LocalStorageService } from '../services/localstorage.service';
import { EventComponent } from '../event/event.component';
//import { EventEmitter } from 'events';
import { EventEmitter } from '@angular/core'; 

@Component({
  selector: 'app-set-results',
  templateUrl: './set-results.component.html',
  styleUrls: ['./set-results.component.scss']
})
export class SetResultsComponent implements OnInit {

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private localStorageService: LocalStorageService) { }
  tournamentName: string;
  form: FormGroup;
  @Input() numRound: number;
  @Input() numPoule: number;
  @Input() team1: string;
  @Input() team2: string;
  @Output() messageToParent = new EventEmitter();

  ngOnInit() {
    this.tournamentName = this.route.snapshot.params['trn'];
    this.form = this.fb.group({
      set11: undefined,
      set12: undefined,
      set21: undefined,
      set22: undefined,
      set31: undefined,
      set32: undefined,
      set41: undefined,
      set42: undefined,
      set51: undefined,
      set52: undefined
    }) 
  }

  onSubmit(team1: string, team2: string){
    for(let i=1; i<=5; i++){
      let score1 = this.form.value["set"+i+"1"];
      let score2 = this.form.value["set"+i+"2"];
      console.log(score1);
      console.log(score2);
      this.localStorageService.addSetScoreToPool(this.tournamentName, this.numRound, this.numPoule, team1, team2, score1, score2);
    }
    this.messageToParent.emit("ok");
  }
}

