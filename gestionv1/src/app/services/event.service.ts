import { Injectable } from '@angular/core';
import { EventVB } from "../models/event.modele";
import { EVENTS } from '../pseudoBDD/events-list';

@Injectable()
export class EventService {

    //eventSubject = new Subject<any[]>();
 
    events : EventVB[] = EVENTS;
    constructor(){}


    getEventByName(name : string){
        const ev = this.events.find(
            (eventObject) => {
                return eventObject.name === name;
            }
        );
        return ev;
    }
    addEvent(E: EventVB){
        // rajouter les instruction pour rajouter dans la BDD
    }
    getEventForUser(eventsname: string[]){
        const evs : EventVB[] = [];
        eventsname.forEach(name => {
            evs.push(this.getEventByName(name));
        })
        console.log(evs);
        return evs;
    }

}
