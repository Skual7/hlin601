export class Team {
    constructor(
        public tournamentId: string,
        public teamName: string,
        public players: string[],
        public playersLevel: number[]
        ){}
}