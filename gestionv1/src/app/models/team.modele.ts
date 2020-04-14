export class Team {
    constructor(
        public tournamentid: string,
        public teamName: string,
        public players: string[],
        public playersLevel: number[]
        ){}
}