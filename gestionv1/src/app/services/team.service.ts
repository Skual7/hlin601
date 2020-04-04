import { Team } from '../models/team.modele';
import { Subject } from 'rxjs';

export class TeamService {
    
    private teams: Team[] = [];


    teamSubject = new Subject<Team[]>();
    emitTeam(){
        this.teamSubject.next(this.teams.slice());
    }

    addTeam(T : Team){
        this.teams.push(T);
        this.emitTeam();
    }

}