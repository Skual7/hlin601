import { User } from '../models/user.model';
import { Subject} from 'rxjs/Subject';


export class UserService {
    private users: User[] = [
        {
            firstName: 'Louis',
            lastName: 'Lamalle',
            email: 'tchoupi@lebg.com',
            niveau: 5,
            tournoisInscrit: [ 'Green Tour', 'Tournois de la bière']
        }
    ];
    userSubject = new Subject<User[]>();

    emitUsers(){
        this.userSubject.next(this.users.slice());
    }
    addUser(user: User){
        this.users.push(user);
        this.emitUsers();
    }
}