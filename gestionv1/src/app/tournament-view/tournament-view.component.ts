import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../services/localstorage.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-vue-generale',
  templateUrl: './tournament-view.component.html',
  styleUrls: ['./tournament-view.component.scss']
})

export class TournamentViewComponent implements OnInit {

  constructor(private route : ActivatedRoute, private localStorageService : LocalStorageService,
            private router : Router) { }
  nameEv = "";
  name ="";
  rounds;

  ngOnInit(): void {
    this.name = this.route.snapshot.params['trn'];
    this.nameEv = this.route.snapshot.params['name'];
    this.rounds = this.localStorageService.getRounds(this.name);

  }
  

  monStyle(){
    let taille = 100/this.rounds.length
    console.log(100/this.rounds.length)
    return {
      //'width': '45%',
      'height': '100%',
      'display':'inline',
      'text-align':'center',
      'margin-left': '10px',
      'margin-right': '10px',
      'float' : 'left',
      //'border-bottom' : 'solid'
    }
  }

  addR(){
    this.localStorageService.addRoundAutomate(this.name);
    this.rounds = this.localStorageService.getRounds(this.name);
  }


}
