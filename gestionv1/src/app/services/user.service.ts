import { User } from "../models/user.model";
import { Subject } from 'rxjs/Subject';
import { Injectable } from '@angular/core';

@Injectable()
export class UserService {

    //userSubject = new Subject<User>();
    user = new User("Marie","Joana","01/01/1000",
    "adresse@email.fr",3, [ {tournamentid: "Elite G20/06/20", teamName: "TheTeam", players: [ "Thomas", "Louis", "Solal", "Marie"],
        playersLevel: [ 3,2,3,4] }]);


    /*emitUsers(){
        this.userSubject.next(this.userTest.slice());
    }
    */

}