import { Component, OnInit, Input } from '@angular/core';
import { EventService } from '../services/event.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-single-event',
  templateUrl: './single-event.component.html',
  styleUrls: ['./single-event.component.scss']
})
export class SingleEventComponent implements OnInit {
  @Input() name: string;
  @Input() dateEv: string;
  @Input() dateLimite: string;
  @Input() tournois: any[];
  @Input() participe:  boolean;
  
 // @Input() indexEvent: number;



  constructor(private eventService: EventService,
            private route : ActivatedRoute) { }

  ngOnInit() {
    const name = this.route.snapshot.params['id']; //=nom event
    this.name = this.eventService.getEventByName(name).name;
    this.dateEv = this.eventService.getEventByName(name).dateEv;
    this.dateLimite = this.eventService.getEventByName(name).dateLimite;
    this.tournois = this.eventService.getEventByName(name).tournois;
    this.participe = this.eventService.getEventByName(name).participe;
  }

}
