import { Component, OnInit } from '@angular/core';
import { TournoiService } from '../services/tournoi.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-single-tournoi',
  templateUrl: './single-tournoi.component.html',
  styleUrls: ['./single-tournoi.component.scss']
})
export class SingleTournoiComponent implements OnInit {
  name: string = 'Tournoi'; // par def
  inscrit: string = 'non'; // par def

  constructor(private tournoiService: TournoiService, private route : ActivatedRoute) { }

  ngOnInit() {
    const id = this.route.snapshot.params['id']; // id qui sera ds param sera le nom du appareil
    this.name = this.tournoiService.getTournoiById(+id).name; // + pour cast id en nombre 
    // car au dessu c'est retourné en string
    this.inscrit = this.tournoiService.getTournoiById(+id).inscrit;
  }

}
