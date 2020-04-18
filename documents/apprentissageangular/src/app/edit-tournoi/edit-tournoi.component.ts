import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TournoiService} from '../services/tournoi.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-edit-tournoi',
  templateUrl: './edit-tournoi.component.html',
  styleUrls: ['./edit-tournoi.component.scss']
})
export class EditTournoiComponent implements OnInit {
  defaultInscrit = 'non';
  constructor(private tournoiService : TournoiService,
              private router: Router) { }

  ngOnInit() {
  }
  onSubmit(form: NgForm){
    const name = form.value['name'];
    const inscrit = form.value['inscrit'];
    this.tournoiService.addTournoi(name,inscrit);
    this.router.navigate( ['/tournois']);
  }

}
