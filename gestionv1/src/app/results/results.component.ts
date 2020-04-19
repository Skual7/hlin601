import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LocalStorageService } from '../services/localstorage.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {
  @Input() numRound: number;
  @Input() numPoule: number;
  tournamentName: string;
  form: FormGroup;
  displayModifScore: boolean;
  team1: "";
  team2: "";

  constructor(private route: ActivatedRoute, private localStorageService: LocalStorageService, private fb: FormBuilder) { }
  ngOnInit() {
    this.displayModifScore = false;
    this.tournamentName = this.route.snapshot.params['trn'];
    this.form = this.fb.group({
      set11: '',
      set12: '',
      set21: '',
      set22: '',
      set31: '',
      set32: '',
      set41: '',
      set42: '',
      set51: '',
      set52: ''
    }) 
  }

  modifScore(team1, team2){
    this.team1 = team1;
    this.team2 = team2;
    this.displayModifScore = true;
  }

 /* onSubmit(team1: string, team2: string){
    this.displayForm = false;
    for(let i=1; i<=5; i++){
      let score1 = this.form.value["set"+i+"1"];
      let score2 = this.form.value["set"+i+"2"];
      console.log(score1);
      console.log(score2);
      this.localStorageService.addSetScoreToPool(this.tournamentName, this.numRound, this.numPoule, team1, team2, score1, score2);
    }
  }*/

  getScore(tournamentName: string, numRound: number, numPoule: number, numMatch: number){
    let score = this.localStorageService.getScoreFromMatch(tournamentName, numRound, numPoule, numMatch);
    let results = "";
    for(let i=0; i<5; i++){
      if(score[i]!=undefined && score[i][0]!=undefined){
        results += " set "+(i+1)+" : "+score[i][0]+" à "+score[i][1]+" ;";
      }
    }
    return results.substring(0,results.length-1);
  }

  hideModifScore(){
    this.displayModifScore = false;
  }

}