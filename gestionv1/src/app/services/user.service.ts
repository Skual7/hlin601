import { User } from "../models/user.model";
import { Injectable } from '@angular/core';

@Injectable()
export class UserService {
    // Normalement cet user est extrait de la bdd mais ici on le fait direct ici
    user = new User("Earvin","Ngapeth","12/02/1991",
        "Earvin@email.fr",3, [{ tournamentid: "Elite G20/06/20",teamName: "champ",
            players: [[ "Benjamin","5"] ,["Julien","5"] ,["Nicolas","4"] ,["Earvin","5"]]}], ["Green tour de Gignac"]);
    
    eventInProgress = ""; // pour garder le tournois en cours de gestions

    
    constructor( ){}



}