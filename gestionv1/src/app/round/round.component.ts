import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TournamentService } from '../services/tournament.service';
import { getNumberOfCurrencyDigits } from '@angular/common';

@Component({
  selector: 'app-round',
  templateUrl: './round.component.html',
  styleUrls: ['./round.component.scss']
})
export class RoundComponent implements OnInit {
  @Input() pouleArray : Array<object>;
  @Input() numRound: number;
  
  nameTourament="";

  constructor(private route : ActivatedRoute, private tournamentService : TournamentService) {}

  addP(){
    this.tournamentService.addPoolToRound(this.nameTourament,this.numRound);
    this.pouleArray = this.tournamentService.getPoolsFromRound(this.nameTourament,this.numRound);
  }
  ngOnInit(): void {
    this.nameTourament = this.route.snapshot.params['trn'];

  }

}
