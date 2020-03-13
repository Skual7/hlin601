import { Component,Input, OnInit } from '@angular/core';
import { TournoiService } from '../services/tournoi.service';

@Component({
  selector: 'app-tournoi',
  templateUrl: './tournoi.component.html',
  styleUrls: ['./tournoi.component.scss']
})
export class TournoiComponent implements OnInit {

  @Input() name: string;
  @Input() inscrit: string;
  @Input() indexTournoi: number;
  @Input() id: number;

  //name = 'Green tour';
  //inscrit = 'non';
  constructor(private tournoisService: TournoiService) { }

  ngOnInit() {
  }
  getInscrit(){
    return this.inscrit;
  }
  getColor(){
    if(this.inscrit === 'oui') return 'green';
    else return 'red';
  }
  onInscrire(){
    this.tournoisService.inscrireTournoi(this.indexTournoi);
  }
  onDesinscrire(){
    this.tournoisService.desinscrireTournoi(this.indexTournoi);
  }
}
