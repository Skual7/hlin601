import { Subject } from 'rxjs'
import { Injectable, OnInit } from '@angular/core';
import { Tournament } from '../models/tournament.interface';
import { TOURNAMENTS } from '../pseudoBDD/tournaments-list';

@Injectable()
export class TournamentService {
    // devra être remplacé par un download du serveur
    tournaments : Tournament[] = TOURNAMENTS;
    // ------------------ Implementer les subject après -------
    tournamentSubject = new Subject<Tournament[]>();
    emitTournamentSubject(){
        this.tournamentSubject.next(this.tournaments.slice());
    }
    // ---------------------------------------------------------
    tournament: Tournament; // tournois courrant


    constructor(){
    }



    // inutile ?? 
    getTournaments(): Tournament[] {
        return TOURNAMENTS;
    }

    getTournamentById(id: string){
        const tournament = this.tournaments.find(
            (tournamentObj) => {
                return (tournamentObj.id === id);
            }
        );
        return tournament;
    }
    setTournament(id){
        this.tournament = this.getTournamentById(id);
    }

}

/*


    tournaments: Tournament[];


    constructor(){}
    

    getTournaments(): 

    */