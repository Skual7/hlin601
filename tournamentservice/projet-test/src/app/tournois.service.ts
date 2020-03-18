import { Injectable } from '@angular/core';
import { element } from 'protractor';

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
    this.addPlayer('Dragons Rouges','thomascaprio',5);
    //this.addPlayer('Dragons Rouges','solalgoldstein',1);
    //this.removeTeam('Dragons Bleus');
    //this.removePlayer('Dragons Rouges','thomascaprio');
    //this.addPlayer('Dragons Rouges','thomascaprio',5);
  }

  getTournament(){
    return JSON.parse(window.localStorage.getItem('tournament'));
  }

  setTournament(value){
    window.localStorage.setItem('tournament',JSON.stringify(value));
  }
  
  //Gestion information du tournois
  setTournamentName(tournamentName){
    var tournament = this.getTournament();
    tournament[0] = tournamentName;
    this.setTournament(tournament);
  }

  getTournamentName() {
    return this.getTournament()[0];
  }

  //Gestion des Equipes
  getTeams(){
    return this.getTournament()[1];
  }

  getTeamNumberByName(teamN) {
    var teamNumber = 0;
    for (let team of this.getTournament()[1]) {
      if (team[0] === teamN) {
        return teamNumber;
      }
      teamNumber++;
    }
  }

  getTeam(teamN){
    if(isNaN(teamN)){
        return this.getTeamNumberByName(teamN);
    }
    else{
      return this.getTeams()[teamN];
    }
  }

  addTeam(teamName){
    var tournament = this.getTournament();
    tournament[1].push([teamName,,[]]);
    this.setTournament(tournament);
  }

  removeTeam(teamN){
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

  setTeamLevel(teamN,teamLevel){
    if (isNaN(teamN)) {
      this.setTeamLevel(this.getTeamNumberByName(teamN),teamLevel);
    }
    else {
      var tournament = this.getTournament();
      tournament[1][teamN][1] = teamLevel;
      this.setTournament(tournament);
    }
  }

  calcTeamLevel(teamN){
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

  //-------------------Gestion Joueurs
  getTeamPlayers(teamN){
    if(isNaN(teamN)){
      this.getTeamPlayers(this.getTeamNumberByName(teamN));
    }
    else{
      return this.getTournament()[1][teamN][2];
    }
  }

  addPlayer(teamN, playerName, playerLevel) {
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

  removePlayer(teamN,playerName){
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
}
