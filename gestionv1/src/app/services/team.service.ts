import { Team } from '../models/team.modele';
import { Subject } from 'rxjs';
import { TEAMS } from '../pseudoBDD/teams-list';

export class TeamService {
    
    private teams: Team[] = TEAMS;

    team2 : Team[];
    tournamentid: string;
    /*teamName: string;
    players: string[];
    playersLevel: number[];
 */
    /* teamSubject = new Subject<Team[]>();
    team : Team;
    emitTeam(){
        this.teamSubject.next(this.teams.slice());
    }

    addTeam(T : Team){
        this.teams.push(T);
        this.emitTeam();
    } */

    getTeamByName(teamName : string){
        const team = this.teams.find(
            (teamObj) => { return (teamObj.teamName == teamName) }
        );
        return team;
    }
}