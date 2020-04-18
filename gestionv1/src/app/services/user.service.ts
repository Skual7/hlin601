import { User } from "../models/user.model";
import { Injectable } from '@angular/core';

@Injectable()
export class UserService {
    // Normalement cet user est extrait de la bdd mais ici on le fait direct ici
    user = new User("Marie","Joana","01/01/1000",
        "adresse@email.fr",3, [{ tournamentid: "Elite F20/06/20",teamName: "TeamTest",
            players: [[ "Jean","2"] ,["Perd","1"] ,["laBoule","3"] ,["Marie","4"]]}], ["Green tour de Gignac"]);
    
    eventInProgress = ""; // pour garder le tournois en cours de gestions

    
    constructor( ){}



}