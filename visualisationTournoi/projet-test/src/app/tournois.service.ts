import { Injectable } from '@angular/core';
import { element } from 'protractor';

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

@Injectable({
  providedIn: 'root'
})


export class TournoisService {

  constructor() {
    window.localStorage.setItem('tournament',JSON.stringify(['',[],[]]));
  }

  tournamentInit(tournamentName){
    this.setTournamentName(tournamentName);
    this.getTournamentName();
    this.addTeam('Dragons Rouges');
    this.addTeam('Dragons Bleus');
    this.addTeam('Dragons Jaunes');
    this.addPlayer('Dragons Rouges','thomascaprio',5);
    this.addPlayer('Dragons Rouges','solalgoldstein',1);
    this.addRound();
    this.addPoolToRound(0);
    this.addTeamToPool(0,0,0);
    this.addTeamToPool(1,0,0);
    this.addTeamToPool('Dragons Jaunes',0,0);
    this.addSetScoreToPool(0,0,1,0,25,21);
    console.log(this.whoWonMatch(0,0,1,0));
 }

  getTournament(){
    return JSON.parse(window.localStorage.getItem('tournament'));
  }

  setTournament(value:any){
    window.localStorage.setItem('tournament',JSON.stringify(value));
  }

  errorm1(methodeN:string){
    console.log('Return -1 from : '+methodeN);
  }
  
  //Gestion information du tournois--------------------------------------------------------------------------
  setTournamentName(tournamentName:string){
    var tournament = this.getTournament();
    tournament[0] = tournamentName;
    this.setTournament(tournament);
  }

  getTournamentName() {
    return this.getTournament()[0];
  }

  //Gestion des Equipes--------------------------------------------------------------------------------------
  getTeams(){
    return this.getTournament()[1];
  }

  getTeamNumberByName(teamN:any) {
    var teamNumber = 0;
    for (let team of this.getTournament()[1]) {
      if (team[0] === teamN) {
        return teamNumber;
      }
      teamNumber++;
    }
    this.errorm1('getTeamNumberByName');
    return -1;
  }

  getTeamNumber(teamN:any){
    if(isNaN(teamN)){
        return this.getTeamNumberByName(teamN);
    }
    else{
      return teamN;
    }
  }

  getTeam(teamN:any){
    if(isNaN(teamN)){
        return this.getTeam(this.getTeamNumberByName(teamN));
    }
    else{
      return this.getTeams()[teamN];
    }
  }

  addTeam(teamName:string){
    var tournament = this.getTournament();
    tournament[1].push([teamName,,[]]);
    this.setTournament(tournament);
  }

  removeTeam(teamN:any){
    if (isNaN(teamN)) {
      this.removeTeam(this.getTeamNumberByName(teamN));
    }
    else {
      var tournament = this.getTournament(), newTeamList = [];
      for(let i =0; i < tournament[1].length; i++){
        if(i != teamN){
          newTeamList.push(tournament[1][i]);
        }
      }
      tournament[1] = newTeamList;
      this.setTournament(tournament);
    }
  }

  setTeamLevel(teamN:any,teamLevel:number){
    if (isNaN(teamN)) {
      this.setTeamLevel(this.getTeamNumberByName(teamN),teamLevel);
    }
    else {
      var tournament = this.getTournament();
      tournament[1][teamN][1] = teamLevel;
      this.setTournament(tournament);
    }
  }

  calcTeamLevel(teamN:any){
    if (isNaN(teamN)) {
      this.calcTeamLevel(this.getTeamNumberByName(teamN));
    }
    else {
      var playerList= this.getTeamPlayers(teamN);
      var level=0, nbPlayer=0;
      for(let player of playerList){
        level += parseInt(player[1]);
        nbPlayer++;
      }
      return level/nbPlayer;
    }
  }

  //-------------------Gestion Joueurs-------------------------------------------------------------------
  getTeamPlayers(teamN:any){
    if(isNaN(teamN)){
      this.getTeamPlayers(this.getTeamNumberByName(teamN));
    }
    else{
      return this.getTournament()[1][teamN][2];
    }
  }

  addPlayer(teamN:any, playerName:string, playerLevel:number) {
    if (isNaN(teamN)) {
      this.addPlayer(this.getTeamNumberByName(teamN),playerName,playerLevel);
    }
    else {
      var tournament = this.getTournament();
      tournament[1][teamN][2].push([playerName, playerLevel]);
      this.setTournament(tournament);
      this.setTeamLevel(teamN,this.calcTeamLevel(teamN));
    }
  }

  removePlayer(teamN:any,playerName:string){
    if (isNaN(teamN)) {
      this.removePlayer(this.getTeamNumberByName(teamN),playerName);
    }
    else {
      var tournament = this.getTournament(), newPlayerList = [];
      for(let player of tournament[1][teamN][2]){
        if(player[0] != playerName){
          newPlayerList.push(player);
        }
      }
    tournament[1][teamN][2] = newPlayerList;
    this.setTournament(tournament);
    this.setTeamLevel(teamN,this.calcTeamLevel(teamN));
    }
  }

  //Gestion Round-----------------------------------------------------------------
  getRounds(){
    return this.getTournament()[2];
  }

  addRound(){
    var tournament = this.getTournament();
    tournament[2].push([]);
    this.setTournament(tournament);
  }

  //------------Gestion poule-----------------------------------------------------
  cocote(){
    console.log('cote cote cote');
  }

  getPoolsFromRound(roundN:number){
    return this.getTournament()[2][roundN];
  }

  getPoolFromRound(roundN:number,poolN:number){
    return this.getTournament()[2][roundN][poolN];
  }

  addPoolToRound(roundN:number){
    var tournament = this.getTournament();
    tournament[2][roundN].push([[],[]]);
    this.setTournament(tournament);
  }

  addTeamToPool(teamN:any,roundN:number,poolN:number){
    var numTeam = this.getTeamNumber(teamN);
    var tournament = this.getTournament();
    for(let team of tournament[2][roundN][poolN][0]){
      this.addMatchToPool(roundN,poolN,numTeam,team);
    }
    tournament = this.getTournament();
    tournament[2][roundN][poolN][0].push(numTeam);
    this.setTournament(tournament);
  }

  //--------------------------Gestion Match---------------------------------------
  getScoresFromPool(roundN:number,poolN:number){
    //à définir
  }

  addMatchToPool(roundN:number,poolN:number,team1N:any,team2N:any){
    var tournament = this.getTournament();
    tournament[2][roundN][poolN][1].push([this.getTeamNumber(team1N),this.getTeamNumber(team2N),[]]);
    this.setTournament(tournament);
  }

  getMatchNumberFromTeam(pool:any,teamN1:any,teamN2:any){
    var matchN = 0;
    for(let match of pool[1]){
      if(match[0] == this.getTeamNumber(teamN1) && match[1] == this.getTeamNumber(teamN2)){
        return matchN;
      }
      matchN++;
    }
    this.errorm1('getMatchNumberFromTeam(['+JSON.stringify(pool)+'] , '+teamN1+' , '+teamN2+')');
    return -1;
  }

  addSetScoreToPool(roundN:number,poolN:number,team1N:any,team2N:any,score1:number,score2:number){
    var matchN = this.getMatchNumberFromTeam(this.getPoolFromRound(roundN,poolN),this.getTeamNumber(team1N),this.getTeamNumber(team2N));
    var tournament = this.getTournament();
    tournament[2][roundN][poolN][1][matchN][2].push([score1,score2]);
    this.setTournament(tournament);
  }

  whoWonMatch(roundN:number,poolN:number,team1N:any,team2N:any){
    var matchN =  this.getMatchNumberFromTeam(this.getPoolFromRound(roundN,poolN),this.getTeamNumber(team1N),this.getTeamNumber(team2N));
    var team1 = 0, team2 = 0;
    for(let set of this.getPoolFromRound(roundN,poolN)[1][matchN][2]){
      if(set[0]>set[1]){
        team1++;
      }
      else{
        team2++;
      }
    }
    return team1>team2?this.getTeamNumber(team1N):this.getTeamNumber(team2N);

  }

  // Gestion de la programmation des tours suivants
  

  getQualified(nbQualifByPool,numRound){
    var qualified=[];
    var pools = this.getPoolsFromRound(numRound);
    for(var i in pools){
      //mettre les qualifiés dans le tableau qualified
    }
    return qualified;
  }

  nextRandRound(nbPool,nbTeamByPool){
    this.addRound();
    var numRound = this.getRounds().length-1;
    var qualified = this.getQualified(nbTeamByPool,numRound-1);
    for(var i=0;i<nbPool;i++){
      this.addPoolToRound(numRound);
      for(var j=0;j<nbTeamByPool;j++){
        var t = getRandomInt(qualified.length);
        var team = qualified[t];
        this.addTeamToPool(team,numRound,i);
        qualified.splice(t,1);
      }
    }
  }

}
