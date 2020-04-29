import { User } from "../models/user.model";
import { Injectable } from '@angular/core';
import { RequestService } from './request.service';
@Injectable()
export class UserService {

    user = new User("Earvin","Ngapeth","12/02/1991",
        "Earvin@email.fr",3, [{ tournamentid: "Elite G20/06/20",teamName: "champ",
            players: [[ "Benjamin","5"] ,["Julien","5"] ,["Nicolas","4"] ,["Earvin","5"]]}], ["Green tour de Gignac"]);
  
   // pour garder le tournois en cours de gestions
    eventInProgress = "";//  marche pas encore
//    user : User;

    constructor(private requestService: RequestService ){}

    setUser(f:string){
        f = JSON.parse(f); 
       // console.log(f);
       // console.log(f['email']);
        const u = new User(f['firstname'], f['lastName'],f['dateNaissance'],f['email'], f['level'],[],[]);
        this.user = u;
    }

    modifUser(firstname : string, lastname: string, email: string, level:  number ){
        let r = this.requestService.request("UPDATE user SET firstname = '"+firstname+"', lastname='"+lastname+"', level='"+level+"' WHERE email='"+email+"'");
        console.log(r);
      }

  



}