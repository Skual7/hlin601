import { Injectable } from '@angular/core';
import { EventVB } from "../models/event.modele";
import { EVENTS } from '../pseudoBDD/events-list';
import { RequestService } from './request.service';
import { LocalStorageService } from './localstorage.service';

@Injectable()
export class EventService {

    
    events : EventVB[] = EVENTS;
    constructor(private rs: RequestService, private localStorageService : LocalStorageService){}
    getEventFromBDD(){
        let r = this.rs.request("SELECT * FROM event");
        r = JSON.parse(r);
        console.log(r);
        for(let i=0; i < r.length; i++){
            console.log(r[i][0]);
        }
        console.log(r[0][0]);
    }

    getEventByName(name : string){
        const ev = this.events.find(
            (eventObject) => {
                return eventObject.name === name;
            }
        );
        return ev;
    }
    addEvent(E: EventVB){
        this.rs.request('INSERT INTO event (nom, dateE,dateLimite,description) VALUES ( "'+E.name+'", "'+E.dateEv+'", "'+E.dateLimite+'", "'+E.description+'")');
    }
    getEventForUser(eventsname: string[]){
        const evs : EventVB[] = [];
        eventsname.forEach(name => {
            evs.push(this.getEventByName(name));
        })
        console.log(evs);
        return evs;
    }
    parseEvents(events: string){
        //events['string'].
        //const e = new EventVB(events['name'], events['dateE'], events['dateLimite'], events[''])
    }
}
