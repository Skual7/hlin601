import { User } from "../models/user.model";
import { Injectable } from '@angular/core';

@Injectable()
export class UserService {
    // Normalement cet user est extrait de la bdd mais ici on le fait direct ici
    user = new User("Marie","Joana","01/01/1000",
        "adresse@email.fr",3, [{tournamentid: "Elite G20/06/20", teamName: "TheTeam", players: [ "Thomas", "Louis", "Solal", "Marie"],
        playersLevel: [ 3,2,3,4] }], ["Green tour de Gignac"]);

    // pour garder le tournois en cours de gestions
    eventInProgress = "";
    constructor( ){}



}