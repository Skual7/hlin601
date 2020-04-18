import { Team } from '../models/team.modele';
import { TEAMS } from '../pseudoBDD/teams-list';
import { Subject } from 'rxjs';

export class TeamService {
    
    private teams: Team[] = TEAMS;
    teamByTournament : any[];

    tournamentid: string;
    newTeam : Team; // nouvelle équipe à ajouter

    /*teamName: string;
    players: string[];
    playersLevel: number[];
 */
     teamSubject = new Subject<Team[]>();
    team : Team;
    emitTeam(){
        this.teamSubject.next(this.teams.slice());
    }

    addTeam(T : Team){
        // rajouter les instructions pour rajouter la team dans la BDD
        // rajouter le nom de la team dans teamRegistered du tournois qui a le tournamentid
    }

    getTeamByTournament(teamRegitered: string[]){ 
        const teams : Team[] = [];
        teamRegitered.forEach( t => {
            const team = this.teams.find(
                (teamObj) => { return (teamObj.teamName === t);}
            )
            //console.log(team);
            teams.push(team);
        });
        return teams;
    }
    // Retourne objet Team corresp au nom (utilisé dans getTeams() de tournamentComp)
    getTeamByName(teamName : string){
        const team = this.teams.find(
            (teamObj) => { return (teamObj.teamName == teamName) }
        );

        return team;
    }
}