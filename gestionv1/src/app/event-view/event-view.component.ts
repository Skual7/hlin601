import { Component, OnInit } from '@angular/core';
import { EventService } from '../services/event.service';
import { Subscription } from 'rxjs';
import { Event } from '../models/event.interface';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-event-view',
  templateUrl: './event-view.component.html',
  styleUrls: ['./event-view.component.scss']
})
export class EventViewComponent implements OnInit {

  events : Event[];
  // eventSubscription: Subscription;

  constructor(private eventService: EventService) { }
  ngOnInit(){
    this.events = this.eventService.events;
  }

}
/*

  ngOnInit() {
    this.eventSubscription = this.eventService.eventSubject.subscribe(
      (events) => { this.events = events;}
    );
    this.eventService.emitEvent();
    
  }
*/