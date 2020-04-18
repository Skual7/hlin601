import { Subject } from 'rxjs';

export class TournoiService {
    tournoiSubject = new Subject<any[]>();

    private tournois = [
        {
          id: 1,
          name: 'Green Tour Gignac',
          inscrit: 'oui'
        },
        {
          id : 2,
          name: 'Beach Volley Sète',
          inscrit: 'non'
        },
        {
          id: 3,
          name: 'Tournoi Noel',
          inscrit: 'oui'
        }
    ];
    // pr forcer le subject à émettre ce qu'on lui passe par arg 
    // en gros rendre tournois accessible (slice pour copie)
    emitTournoiSubject(){
        this.tournoiSubject.next(this.tournois.slice());
    }
    getTournoiById(id: number){
        const tournoi = this.tournois.find(
            (tournoiObject) => {
                return tournoiObject.id === id;
            }
        );
        return tournoi;
    }

    inscriptionTous() {
        for(let tour of this.tournois){
            tour.inscrit = 'oui';
        }
        this.emitTournoiSubject();
    }
    desinscriptionTous(){
        for(let tour of this.tournois){
            tour.inscrit = 'non';
        }
        this.emitTournoiSubject();
    }
    inscrireTournoi(index: number){
        this.tournois[index].inscrit = 'oui'; 
        this.emitTournoiSubject();
    }
    desinscrireTournoi(index: number){
        this.tournois[index].inscrit = 'non';
        this.emitTournoiSubject();
    }
    addTournoi(name: string , inscrit : string){
        const tournoiObject = {
            id: 0,
            name: "",
            inscrit: "",
        };
        tournoiObject.name = name;
        tournoiObject.inscrit = inscrit;
        tournoiObject.id = this.tournois[(this.tournois.length - 1)].id +1 ;
        // laisser à l'user l'id du tournoi (avec nom ou autre)
        this.tournois.push(tournoiObject);
        this.emitTournoiSubject();
    }
}