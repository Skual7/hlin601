import { User } from "../models/user.model";
import { Subject } from 'rxjs/Subject';
import { Injectable } from '@angular/core';

@Injectable()
export class UserService {

    //userSubject = new Subject<User>();
    user = new User("Marie","Joana","01/01/1000",
    "adresse@email.fr",3,["Tournoi de Cajou", "Coronatournoi"]);

    userTest = [
        {
            firstName: "Tommy", 
            lastName: "Shelby",
            birthday: "01/01/1000",
            email: "adresse@email.fr",
            niveau: 2,
            tournoisInscrit: [ 'tournois au pif', 'tournois chez moi']
        }
    ];
    

    /*emitUsers(){
        this.userSubject.next(this.userTest.slice());
    }
    */

}