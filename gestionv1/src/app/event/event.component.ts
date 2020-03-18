import { Component, OnInit, Input } from '@angular/core';
import { EventService } from '../services/event.service';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {

  //name: string;
  @Input() name: string;
  @Input() dateEv: Date;
  @Input() dateLimite: Date;
  @Input() tournois: any[];
  @Input() participe:  boolean;
  @Input() indexEvent: number; // pr *ngFor et (un)registerTeam

  constructor(private eventService: EventService) { }

  ngOnInit() {
  }
  getColor(){
    if(this.participe) return 'green';
    else return 'red';
  }

  
  registerTeam(){
    this.eventService.registerTeam(this.indexEvent);
  }
  unregisterTeam(){
    this.eventService.unregisterTeam(this.indexEvent);
  }

}
