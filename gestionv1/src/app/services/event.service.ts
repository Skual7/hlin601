import { Injectable } from '@angular/core';
import { EventVB } from "../models/event.modele";
import { EVENTS } from '../pseudoBDD/events-list';

@Injectable()
export class EventService {

    //eventSubject = new Subject<any[]>();
 
    events : EventVB[] = EVENTS;
    constructor(){}


    getEventByName(name : string){
        const event = this.events.find(
            (eventObject) => {
                return eventObject.name === name;
            }
        );
        return event;
    }
    addEvent(E: EventVB){
        // rajouter les instruction pour rajouter dans la BDD
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