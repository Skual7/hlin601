import { Injectable } from '@angular/core';
import { Tournament } from '../models/tournament.modele';
import { TOURNAMENTS } from '../pseudoBDD/tournaments-list';
import { TeamService } from './team.service';

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


    getTournaments(tournoisName: string[], dateEv : string){
        const T : Tournament[] = [];
        tournoisName.forEach(tournoisName => {
            //console.log(tournoisName);
            //console.log(this.tournamentService.getTournamentById(tournoisName+this.dateEv));
            T.push(this.getTournamentById(tournoisName+dateEv));
        })
        return T;
      }

}

