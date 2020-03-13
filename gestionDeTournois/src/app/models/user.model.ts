import { TournoiComponent } from '../tournoi/tournoi.component';

export class User {
    // en mettant public ça crée directement ces propriétés ds model user
    constructor(public firstName: string, 
                public lastName: string,
                public email: string,
                public niveau: number,
                public tournoisInscrit: string[]){}
}