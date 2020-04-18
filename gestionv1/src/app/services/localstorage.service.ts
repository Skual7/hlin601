import { Injectable } from '@angular/core';
/*
La structure de l'objet stocké dans le locat storage est la suivante :
nomDuTournoi : [format,tableau des équipes, tableau des rounds]

Les équipes sont formées de la sorte en local storage :
[0] nom de l'équipe
[1] niveau moyen
[2] array contenant les joueurs de l'équipe

Les joueurs sont formés de la sorte en local storage :
[0] nom du joueur
[1] niveau du joueur
*/


function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}
@Injectable()
export class LocalStorageService {
  // Pour affichage (activat° des buttons)
  local = false;
  setLocal(){
    this.local = !this.local;
  }

  constructor() {  }

  // GESTIONS des tournois // 
  addTournament(nom: String, format: number){
    this.setTournament(nom,[format,[],[]]);
  }


  getTournament(nom){
    return JSON.parse(window.localStorage.getItem("tournament"))[nom];
  }

  setTournament(tournamentName,value:any){
    let tournament = JSON.parse(window.localStorage.getItem("tournament"));
    tournament[tournamentName] = value;
    window.localStorage.setItem("tournament",JSON.stringify(tournament));
  }

  errorm1(methodeN:string){
    console.log('Return -1 from : '+methodeN);
  }
  
  //Gestion information du tournois--------------------------------------------------------------------------


  //Gestion des Equipes--------------------------------------------------------------------------------------
  getTeams(tournamentName){
    return this.getTournament(tournamentName)[1];
  }

  getTeamNumberByName(tournamentName,teamN:any) {
    var teamNumber = 0;
    for (let team of this.getTournament(tournamentName)[1]) {
      if (team[0] === teamN) {
        return teamNumber;
      }
      teamNumber++;
    }
    this.errorm1('getTeamNumberByName');
    return -1;
  }

  getTeamNumber(tournamentName, teamN:any){
    if(isNaN(teamN)){
        return this.getTeamNumberByName(tournamentName,teamN);
    }
    else{
      return teamN;
    }
  }

  getTeam(tournamentName, teamN:any){
    if(isNaN(teamN)){
        return this.getTeam(tournamentName,this.getTeamNumberByName(tournamentName, teamN));
    }
    else{
      return this.getTeams(tournamentName)[teamN];
    }
  }

  addTeam(tournamentName, teamName:string){
    var tournament = this.getTournament(tournamentName);
    tournament[1].push([teamName,,[]]);
    this.setTournament(tournamentName,tournament);
  }

  removeTeam(tournamentName, teamN:any){
    if (isNaN(teamN)) {
      this.removeTeam(tournamentName, this.getTeamNumberByName(tournamentName, teamN));
    }
    else {
      var tournament = this.getTournament(tournamentName), newTeamList = [];
      for(let i =0; i < tournament[1].length; i++){
        if(i != teamN){
          newTeamList.push(tournament[1][i]);
        }
      }
      tournament[1] = newTeamList;
      this.setTournament(tournamentName,tournament);
    }
  }

  setTeamLevel(tournamentName,teamN:any,teamLevel:number){
    if (isNaN(teamN)) {
      this.setTeamLevel(tournamentName,this.getTeamNumberByName(tournamentName, teamN),teamLevel);
    }
    else {
      var tournament = this.getTournament(tournamentName);
      tournament[1][teamN][1] = teamLevel;
      this.setTournament(tournamentName,tournament);
    }
  }

  calcTeamLevel(tournamentName,teamN:any){
    if (isNaN(teamN)) {
      this.calcTeamLevel(tournamentName,this.getTeamNumberByName(tournamentName,teamN));
    }
    else {
      var playerList= this.getTeamPlayers(tournamentName,teamN);
      var level=0, nbPlayer=0;
      for(let player of playerList){
        level += parseInt(player[1]);
        nbPlayer++;
      }
      return level/nbPlayer;
    }
  }

  //-------------------Gestion Joueurs-------------------------------------------------------------------
  getTeamPlayers(tournamentName,teamN:any){
    if(isNaN(teamN)){
      this.getTeamPlayers(tournamentName,this.getTeamNumberByName(tournamentName,teamN));
    }
    else{
      return this.getTournament(tournamentName)[1][teamN][2];
    }
  }

  addPlayer(tournamentName,teamN:any, playerName:any, playerLevel:any) {
    if (isNaN(teamN)) {
      this.addPlayer(tournamentName,this.getTeamNumberByName(tournamentName,teamN),playerName,playerLevel);
    }
    else {
      var tournament = this.getTournament(tournamentName);
      tournament[1][teamN][2].push([playerName, playerLevel]);
      this.setTournament(tournamentName,tournament);
      this.setTeamLevel(tournamentName,teamN,this.calcTeamLevel(tournamentName,teamN));
    }
  }

  removePlayer(tournamentName,teamN:any,playerName:string){
    if (isNaN(teamN)) {
      this.removePlayer(tournamentName,this.getTeamNumberByName(tournamentName,teamN),playerName);
    }
    else {
      var tournament = this.getTournament(tournamentName), newPlayerList = [];
      for(let player of tournament[1][teamN][2]){
        if(player[0] != playerName){
          newPlayerList.push(player);
        }
      }
    tournament[1][teamN][2] = newPlayerList;
    this.setTournament(tournamentName,tournament);
    this.setTeamLevel(tournamentName,teamN,this.calcTeamLevel(tournamentName,teamN));
    }
  }

  //Gestion Round-----------------------------------------------------------------
  getRounds(tournamentName){
    return this.getTournament(tournamentName)[2];
  }

  addRound(tournamentName){
    var tournament = this.getTournament(tournamentName);
    tournament[2].push([]);
    this.setTournament(tournamentName,tournament);
  }

  //------------Gestion poule-----------------------------------------------------
  cocote(){
    console.log('cote cote cote');
  }

  getPoolsFromRound(tournamentName,roundN:number){
    return this.getTournament(tournamentName)[2][roundN];
  }

  getPoolFromRound(tournamentName,roundN:number,poolN:number){
    return this.getTournament(tournamentName)[2][roundN][poolN];
  }

  addPoolToRound(tournamentName,roundN:number){
    var tournament = this.getTournament(tournamentName);
    tournament[2][roundN].push([[],[]]);
    this.setTournament(tournamentName,tournament);
  }

  addTeamToPool(tournamentName,teamN:any,roundN:number,poolN:number){
    var numTeam = this.getTeamNumber(tournamentName,teamN);
    var tournament = this.getTournament(tournamentName);
    for(let team of tournament[2][roundN][poolN][0]){
      this.addMatchToPool(tournamentName,roundN,poolN,numTeam,team);
    }
    tournament = this.getTournament(tournamentName);
    tournament[2][roundN][poolN][0].push(numTeam);
    this.setTournament(tournamentName,tournament);
  }


  //--------------------------Gestion Match---------------------------------------
  getScoresFromPool(roundN:number,poolN:number){
    //à définir
  }

  addMatchToPool(tournamentName,roundN:number,poolN:number,team1N:any,team2N:any){
    var tournament = this.getTournament(tournamentName);
    tournament[2][roundN][poolN][1].push([this.getTeamNumber(tournamentName,team1N),this.getTeamNumber(tournamentName,team2N),[]]);
    this.setTournament(tournamentName,tournament);
  }

  getMatchNumberFromTeam(tournamentName,pool:any,teamN1:any,teamN2:any){
    var matchN = 0;
    for(let match of pool[1]){
      if(match[0] == this.getTeamNumber(tournamentName,teamN1) && match[1] == this.getTeamNumber(tournamentName,teamN2)){
        return matchN;
      }
      matchN++;
    }
    this.errorm1('getMatchNumberFromTeam(['+JSON.stringify(pool)+'] , '+teamN1+' , '+teamN2+')');
    return -1;
  }

  addSetScoreToPool(tournamentName,roundN:number,poolN:number,team1N:any,team2N:any,score1:number,score2:number){
    var matchN = this.getMatchNumberFromTeam(tournamentName,this.getPoolFromRound(tournamentName,roundN,poolN),this.getTeamNumber(tournamentName,team1N),this.getTeamNumber(tournamentName,team2N));
    var tournament = this.getTournament(tournamentName);
    tournament[2][roundN][poolN][1][matchN][2].push([score1,score2]);
    this.setTournament(tournamentName,tournament);
  }

  whoWonMatch(tournamentName,roundN:number,poolN:number,team1N:any,team2N:any){
    var matchN =  this.getMatchNumberFromTeam(tournamentName,this.getPoolFromRound(tournamentName,roundN,poolN),this.getTeamNumber(tournamentName,team1N),this.getTeamNumber(tournamentName,team2N));
    var team1 = 0, team2 = 0;
    for(let set of this.getPoolFromRound(tournamentName,roundN,poolN)[1][matchN][2]){
      if(set[0]>set[1]){
        team1++;
      }
      else{
        team2++;
      }
    }
    return team1>team2?this.getTeamNumber(tournamentName,team1N):this.getTeamNumber(tournamentName,team2N);

  }

  // Gestion de la programmation des tours suivants
  

  getQualified(tournamentName,nbQualifByPool,numRound){
    var qualified=[];
    var pools = this.getPoolsFromRound(tournamentName,numRound);
    for(var i in pools){
      //mettre les qualifiés dans le tableau qualified
    }
    return qualified;
  }

  nextRandRound(tournamentName,nbPool,nbTeamByPool){
    this.addRound(tournamentName);
    var numRound = this.getRounds(tournamentName).length-1;
    var qualified = this.getQualified(tournamentName,nbTeamByPool,numRound-1);
    for(var i=0;i<nbPool;i++){
      this.addPoolToRound(tournamentName,numRound);
      for(var j=0;j<nbTeamByPool;j++){
        var t = getRandomInt(qualified.length);
        var team = qualified[t];
        this.addTeamToPool(tournamentName,team,numRound,i);
        qualified.splice(t,1);
      }
    }
  }
}