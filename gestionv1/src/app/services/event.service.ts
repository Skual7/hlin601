import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Event } from "../models/event.interface";
import { EVENTS } from '../pseudoBDD/events-list';

@Injectable()
export class EventService {

    //eventSubject = new Subject<any[]>();
 
    events : Event[] = EVENTS;
    constructor(){}


    getEventByName(name : string){
        const event = this.events.find(
            (eventObject) => {
                return eventObject.name === name;
            }
        );
        return event;
    }

}


/*
    emitEvent(){
        this.eventSubject.next(this.events.slice());
    }

    registerTeam(index: number){
        this.events[index].participe = true;
    }
    unregisterTeam(index: number){
        this.events[index].participe = false;
    }
*/