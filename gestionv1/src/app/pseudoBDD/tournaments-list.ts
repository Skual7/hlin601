import { Tournament } from "../models/tournament.interface";

export const TOURNAMENTS: Tournament[] =
[
        {
            id: "Elite G20/06/20",
            nameT: "Elite G",
            format: 3, // pr 3x3 
            teamRegistered: ["TheTeam"],
            winner: "",
            participe: false
        },
        {
            id: "Elite F20/06/20",
            nameT: "Elite F",
            format: 3, // pr 3x3 
            teamRegistered: [],
            winner: "",
            participe: false
        },
        {
            id: "Elite G27/06/20",
            nameT: "Elite G",
            format: 4,
            teamRegistered: [],
            winner: "",
            participe: false
        }
];
