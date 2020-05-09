import { User } from "../models/user.model";
import { Injectable } from '@angular/core';
import { RequestService } from './request.service';
import { EventVB } from '../models/event.modele';

@Injectable()
export class UserService {

  //   user = new User("Earvin","Ngapeth","12/02/1991",
  //       "Earvin@email.fr",3, [{ tournamentid: "Elite G20/06/20",teamName: "champ",
  //           players: [[ "Benjamin","5"] ,["Julien","5"] ,["Nicolas","4"] ,["Earvin","5"]]}], ["Green tour de Gignac"]);

  //  // pour garder le tournois en cours de gestions
  eventInProgress = "";// sert pour onglet "en cours"
  user: User;
  events: EventVB[];
  constructor(private requestService: RequestService) { }

  setUser(f: string) {
    //console.log(f);
    f = JSON.parse(f);
    const u = new User(f[0]['firstname'], f[0]['lastName'], f[0]['dateNaissance'], f[0]['email'], f[0]['level'], [], []);
    this.user = u;
  }
  setUserEvents(email : string) {
    console.log("SetUserEvents has been called");
    let rq = this.requestService.request('SELECT * FROM event WHERE idUser = "'+email+'"')
    this.events = [];
    if (rq != "]") {
      //console.log(rq);
      rq = JSON.parse(rq);

      let i = 0;
      while (rq[i] != undefined) {
        let e = new EventVB(rq[i]['nom'], rq[i]['dateE'], rq[i]['dateLimite'], [], rq[i]['description'])
        i++;
        this.events.push(e);
      }
      //console.log(this.events);
    }  

  }

  modifUser(firstname: string, lastname: string, email: string, level: number) {
    let r = this.requestService.request("UPDATE user SET firstname = '" + firstname + "', lastname='" + lastname + "', level='" + level + "' WHERE email='" + email + "'");
    console.log(r);
  }





}