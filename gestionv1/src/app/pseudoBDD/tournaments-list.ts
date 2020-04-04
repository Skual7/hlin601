import { Tournament } from "../models/tournament.interface";

export const TOURNAMENTS: Tournament[] =
[
        {
            id: "Elite G20/06/20",
            nameT: "Elite G",
            format: 3, // pr 3x3 
            teamRegistered: 3,
            winner: "",
            participe: false
        },
        {
            id: "Elite F20/06/20",
            nameT: "Elite F",
            format: 3, // pr 3x3 
            teamRegistered: 0,
            winner: "",
            participe: false
        },
        {
            id: "Elite G27/06/20",
            nameT: "tournois de cajou",
            format: 4,
            teamRegistered: 0,
            winner: "",
            participe: false
        }
];
