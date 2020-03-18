import { User } from "../models/user.model";
import { Subject } from 'rxjs/Subject';
import { Injectable } from '@angular/core';

@Injectable()
export class UserService {

    //userSubject = new Subject<User>();
    user = new User("Thomas","caprio","01/07/1998",
    "thomas@caprio.fr",3,["Tournoi de Cajou", "Coronatournoi"]);

    userTest = [
        {
            firstName: "Thomas", 
            lastName: "Caprio",
            birthday: "01/071998",
            email: "thomas@caprio.fr",
            niveau: 2,
            tournoisInscrit: [ 'tournois au pif', 'tournois chez moi']
        }
    ];
    

    /*emitUsers(){
        this.userSubject.next(this.userTest.slice());
    }
    */
    //+ faire une mth pour charger user from serveur qd connection

}