import { Injectable } from '@angular/core';
import { EventVB } from "../models/event.modele";
import { EVENTS } from '../pseudoBDD/events-list';
import { RequestService } from './request.service';
import { LocalStorageService } from './localstorage.service';
import { UserService } from './user.service';

@Injectable()
export class EventService {

    
    events : EventVB[] = [];// = EVENTS;
    constructor(private rs: RequestService, private localStorageService : LocalStorageService, private userService : UserService){}
    getEventFromBDD(){
        this.events =  [];
        let r = this.rs.request("SELECT * FROM event");
        console.log(r);
        r = JSON.parse(r);
        let i = 0;
        while(r[i] != undefined){
            let e = new EventVB(r[i]['nom'], r[i]['dateE'], r[i]['dateLimite'],[],r[i]['description']);
           // console.log(e);
            this.events.push(e);
            i++;
        }
    }
    // ajoute l'event à la bdd et récupère son id
    addEvent(E: EventVB){
        let r = this.rs.request('INSERT INTO event (nom, dateE,dateLimite,description, idUser) VALUES ( "'+E.name+'", "'+E.dateEv+'", "'+E.dateLimite+'", "'+E.description+'", "'+this.userService.user.email+'")');
        let r2 = this.rs.request('SELECT id FROM event WHERE nom ="'+E.name+'" AND dateE= "'+E.dateEv+'"');
        r2 = JSON.parse(r2);
        return r2[0]['id'];
    }

    getEventByName(name : string){
        const ev = this.events.find(
            (eventObject) => {
                return eventObject.name === name;
            }
        );
        return ev;
    }
    getEventForUser(eventsname: string[]){
        const evs : EventVB[] = [];
        eventsname.forEach(name => {
            evs.push(this.getEventByName(name));
        })
        console.log(evs);
        return evs;
    }

    getIdForEvent(name: string, dateEv : string, dateLimite: string){
        let r = this.rs.request('SELECT id FROM event WHERE nom ="'+name+'" AND dateE= "'+dateEv+'" AND dateLimite= "'
        +dateLimite+'"');
        r = JSON.parse(r);
        return r[0]['id'];
    }
}
