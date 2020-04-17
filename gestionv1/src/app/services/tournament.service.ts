import { Injectable, OnInit } from '@angular/core';
import { Tournament } from '../models/tournament.modele';
import { TOURNAMENTS } from '../pseudoBDD/tournaments-list';
import { TeamService } from './team.service';
import { Team } from '../models/team.modele';

@Injectable()
export class TournamentService {
    // IMPORT du tableau des tournois /pseudoBDD/tournament-list // 
    // devra être remplacé par un download du serveur // 
    tournaments : Tournament[] = TOURNAMENTS; // "tous les tournois"
    tournament: Tournament; // tournois courrant

    constructor(private teamService: TeamService){}
    getTournamentById(id: string){
        const tournament = this.tournaments.find(
            (tournamentObj) => {
                return (tournamentObj.id === id);
            }
        );
        return tournament;
    }
    // initialise tournois courant pr inscription quand clique sur inscrire //
    // pout que new-team puisse récupérer les informations du tournois // 
    setTournament(id){
        this.tournament = this.getTournamentById(id);
    }
    addTournament(T: Tournament){
        // Rajouter les instructions pour ajouter le tournois à la bdd
    }

}

    // ------------------ Implementer les subject après si mieux compris -------
    // tournamentSubject = new Subject<Tournament[]>();
    // emitTournamentSubject(){
    //     this.tournamentSubject.next(this.tournaments.slice());
    // }
    // ---------------------------------------------------------
