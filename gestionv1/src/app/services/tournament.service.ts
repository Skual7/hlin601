import { Injectable } from '@angular/core';
import { Tournament } from '../models/tournament.modele';
import { TOURNAMENTS } from '../pseudoBDD/tournaments-list';
import { TeamService } from './team.service';
import { RequestService } from './request.service';
import { LocalStorageService } from './localstorage.service';

@Injectable()
export class TournamentService {
    // IMPORT du tableau des tournois /pseudoBDD/tournament-list // 
    // devra être remplacé par un download du serveur // 
    tournaments : Tournament[] = TOURNAMENTS; // "tous les tournois"
    tournament: Tournament; // tournois courrant

    constructor(private teamService: TeamService, private rs: RequestService, private ls : LocalStorageService){}
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
        console.log(T);
        // ajout de la string du tournois
        this.ls.addTournament(T.nameT, T.format); // a la création du tournois
        let str =   window.localStorage.getItem('tournament'); // vers SQL
        console.log(str);
        let r = this.rs.request("INSERT INTO tournaments (nameT,format, string, idE) VALUES ( '"+T.nameT+"', "+T.format+", '"+str+"' , '"+T.id+"' )");
        console.log(r);
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
      getTFromBddByIde(idE: string){
          let idEv = +idE;
          let r = this.rs.request("SELECT * from tournaments WHERE idE= '"+idEv+"'");
          r = JSON.parse(r);
          let i = 0; let ts : Tournament[] = [];
          while(r[i] != undefined){
              let t = new Tournament(idE, r[i]['nameT'],r[i]['format'],[r[i]['string']], r[i]['winner']);
              ts.push(t);
              i++;
          }
          return ts;
      }
      getStringDesTeams(nameT: string, idE : string){
          let r = this.rs.request("SELECT string from tournaments WHERE idE = '"+idE+"' AND nameT='"+nameT+"'");
          console.log(r);
          r = JSON.parse(r);
          console.log(r);

      }
}

