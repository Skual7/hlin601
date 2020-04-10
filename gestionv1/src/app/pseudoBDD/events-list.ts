import { Event } from "../models/event.interface";

export const EVENTS : Event[] = 
[
    {
        name: "Green tour de Gignac",
        dateEv: "20/06/20",
        dateLimite: "19/06/20",
        tournois: [ "Elite G", "Elite F"],
        description: ["Lieu: Terrain de foot de Gignac","Fin des inscriptions: 9:30","Début des tournois à 10:30"]
    },
    {
        name: "Green tour de Montpellier",
        dateEv: "27/06/20",
        dateLimite: "26/06/20",
        tournois: ["Elite G"],
        description: ["Lieu: GGL Stadium","Fin des inscriptions: 9:30","Début des tournois à 10:30"]
    }
];