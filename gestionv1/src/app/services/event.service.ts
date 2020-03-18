import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class EventService {

    eventSubject = new Subject<any[]>();
    currentEvent : any;
    events = [
        {
            name: "Green tour de Gignac",
            dateEv: "20/06/20",
            dateLimite: "19/06/20",
            tournois: [ "Elite G", "Elite F"],
            participe: true
        },
        {
            name: "Green tour de Montpellier",
            dateEv: "27/06/20",
            dateLimite: "26/06/20",
            tournois: [],
            participe: false
        }
    ];

    constructor(){}


    emitEvent(){
        this.eventSubject.next(this.events.slice());
    }

    registerTeam(index: number){
        this.events[index].participe = true;
    }
    unregisterTeam(index: number){
        this.events[index].participe = false;
    }

    getEventByName(name : string){
        const event = this.events.find(
            (eventObject) => {
                return eventObject.name === name;
            }
        );
        return event;
    }

}