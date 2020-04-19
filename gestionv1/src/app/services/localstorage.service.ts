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

  local = false;
  setLocal(){
    this.local = !this.local;
  }
  constructor() {
  }

  m(message: any){
    console.log(message);
  }

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
      return this.getTeamPlayers(tournamentName,this.getTeamNumberByName(tournamentName,teamN));
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

  getRoundByNumber(tournamentName: String, roundN: number){
    return this.getRounds(tournamentName)[roundN];
  }

  addRound(tournamentName){
    var tournament = this.getTournament(tournamentName);
    tournament[2].push([]);
    this.setTournament(tournamentName,tournament);
  }

  addRoundAutomate(tournamentName){
    if(this.getRounds(tournamentName).length == 0){
      this.addRound(tournamentName);
      if(this.getTeams(tournamentName).length%2 == 0){
        for(let i=0;i<this.getTeams(tournamentName).length/2;i++){
          this.addPoolToRound(tournamentName,0);
          this.addTeamToPool(tournamentName,2*i,0,i);
          this.addTeamToPool(tournamentName,2*i+1,0,i);
        }
      }
      else{
        for(let i=0;i<(this.getTeams(tournamentName).length-1)/2;i++){
          this.addPoolToRound(tournamentName,0);
          this.addTeamToPool(tournamentName,2*i,0,i);
          this.addTeamToPool(tournamentName,2*i+1,0,i);
        }
        this.addTeamToPool(tournamentName,this.getTeams(tournamentName).length-1,0,0);
      }
    }
    else{
      let qualifiedTeam = this.calcQualifiedTeamRoundAutomate(tournamentName,this.getRounds(tournamentName).length-1);
      
      this.addRound(tournamentName);
      if(qualifiedTeam.length%2 == 0){
        for(let i=0;i<qualifiedTeam.length/2;i++){
          this.addPoolToRound(tournamentName,this.getRounds(tournamentName).length-1);
          this.addTeamToPool(tournamentName,qualifiedTeam[2*i],this.getRounds(tournamentName).length-1,i);
          this.addTeamToPool(tournamentName,qualifiedTeam[2*i+1],this.getRounds(tournamentName).length-1,i);
        }
      }
      else{
        for(let i=0;i<(qualifiedTeam.length-1)/2;i++){
          this.addPoolToRound(tournamentName,this.getRounds(tournamentName).length-1);
          this.addTeamToPool(tournamentName,qualifiedTeam[2*i],this.getRounds(tournamentName).length-1,i);
          this.addTeamToPool(tournamentName,qualifiedTeam[2*i+1],this.getRounds(tournamentName).length-1,i);
        }
        this.addTeamToPool(tournamentName,qualifiedTeam[qualifiedTeam.length-1],this.getRounds(tournamentName).length-1,0);
      }
    }
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

  getMatchsFromPool(tournamentName: String, roundN: number, poolN: number){
    return this.getPoolFromRound(tournamentName, roundN,poolN)[1];
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

  whoWonMatch(tournamentName: String,roundN:number,poolN:number,team1N:any,team2N:any){
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

  whoWonMatchN(tournamentName: String,roundN:number,poolN:number,matchN: number){
    var team1 = 0, team2 = 0;
    for(let set of this.getPoolFromRound(tournamentName,roundN,poolN)[1][matchN][2]){
      if(set[0]>set[1]){
        team1++;
      }
      else{
        team2++;
      }
    }
    return team1>team2?this.getPoolFromRound(tournamentName,roundN,poolN)[1][matchN][0]:this.getPoolFromRound(tournamentName,roundN,poolN)[1][matchN][1];
  }

  teamPlayedWichPool(tournamentName: String, roundN: number, teamN: number){
    for(let poolN=0; poolN<this.getRoundByNumber(tournamentName,roundN).length;poolN++){
      for(let team of this.getPoolFromRound(tournamentName,roundN,poolN)[0]){
        if(team == teamN){
          return poolN;
        }
      }
    }
    this.errorm1('teamPlayedWichPool('+tournamentName+' , '+roundN+' , '+teamN+')');
    return -1;
  }

  teamPlayedWichMatchs(tournamentName: String, roundN: number, teamN: number){
    let listmatch = [];
    for(let matchN=0;matchN<this.getMatchsFromPool(tournamentName,roundN,this.teamPlayedWichPool(tournamentName,roundN,teamN)).length;matchN++){
      if(teamN == this.getMatchsFromPool(tournamentName,roundN,this.teamPlayedWichPool(tournamentName,roundN,teamN))[matchN][0] || teamN == this.getMatchsFromPool(tournamentName,roundN,this.teamPlayedWichPool(tournamentName,roundN,teamN))[matchN][1]){
          listmatch.push(matchN);
      }
    }
    if(listmatch.length == 0){
      this.errorm1('teamPlayedWichMatch('+tournamentName+' , '+roundN+' , '+teamN+')');
    }
    return listmatch;
  }

  calcTeamPoolMatchWin(tournamentName: String, roundN: number, teamN: number){
    let poolN = this.teamPlayedWichPool(tournamentName,roundN,teamN);

    let nbWin = 0;
    for(let match of this.teamPlayedWichMatchs(tournamentName,roundN,teamN)){
      if(this.whoWonMatchN(tournamentName,roundN,poolN,match) == teamN){
        nbWin++;
      }
    }

    return nbWin;
  }

  calcTeamPoolSetLoss(tournamentName: String, roundN: number, teamN: number){
    let poolN = this.teamPlayedWichPool(tournamentName,roundN,teamN);
    let pool = this.getPoolFromRound(tournamentName,roundN,poolN);
    let nbSetLoss = 0;

    for(let match of this.teamPlayedWichMatchs(tournamentName,roundN,teamN)){
      for(let set of pool[1][match][2]){
        if(pool[1][match][0] == teamN){
          if(set[0]<set[1]){ nbSetLoss++; }
        }
        else{
          if(set[0]>set[1]){ nbSetLoss++; }
        }
      }
    }

    return nbSetLoss;
  }

  calcTeamPoolPointsTaken(tournamentName: String, roundN: number, teamN: number){
    let poolN = this.teamPlayedWichPool(tournamentName,roundN,teamN);
    let pool = this.getPoolFromRound(tournamentName,roundN,poolN);
    let nbPointsTaken = 0;

    for(let match of this.teamPlayedWichMatchs(tournamentName,roundN,teamN)){
      for(let set of pool[1][match][2]){
        if(pool[1][match][0] == teamN){
          nbPointsTaken+= set[1];
        }
        else{
          nbPointsTaken+= set[0];
        }
      }
    }

    return nbPointsTaken;
  }

  getResultPool(tournamentName: String, roundN: number, poolN: number){
    let pool = this.getPoolFromRound(tournamentName,roundN,poolN);
    let res = [];
    for(let team of pool[0]){
      let nbMatchWin = this.calcTeamPoolMatchWin(tournamentName,0,team);
      let nbSetLoss = this.calcTeamPoolSetLoss(tournamentName,0,team);
      let nbPointsTaken = this.calcTeamPoolPointsTaken(tournamentName,0,team);
      res.push(team,[nbMatchWin,nbSetLoss,nbPointsTaken]);
    }
    return res;
  }

  rankingTeamByScore(tournamentName: String, roundN: number, poolN: number){
    let pool = this.getPoolFromRound(tournamentName,roundN,poolN);
    let res = this.getResultPool(tournamentName,roundN,poolN);
    let i = 0;
    let ranking = pool[0];
    while(i < pool[0].length-1){
      if(this.calcTeamPoolMatchWin(tournamentName,roundN,ranking[i]) > this.calcTeamPoolMatchWin(tournamentName,roundN,ranking[i+1])){
        i++;
      }
      else if(this.calcTeamPoolMatchWin(tournamentName,roundN,ranking[i]) < this.calcTeamPoolMatchWin(tournamentName,roundN,ranking[i+1])){
        let temp = ranking[i];
        ranking[i] = ranking[i+1];
        ranking[i+1] = temp;
        i = 0;
      }else{
        if(this.calcTeamPoolSetLoss(tournamentName,roundN,ranking[i]) < this.calcTeamPoolSetLoss(tournamentName,roundN,ranking[i+1])){
          i++;
        }
        else if(this.calcTeamPoolSetLoss(tournamentName,roundN,ranking[i]) > this.calcTeamPoolSetLoss(tournamentName,roundN,ranking[i+1])){
          let temp = ranking[i];
          ranking[i] = ranking[i+1];
          ranking[i+1] = temp;
          i = 0;
        }else{
          if(this.calcTeamPoolPointsTaken(tournamentName,roundN,ranking[i]) < this.calcTeamPoolPointsTaken(tournamentName,roundN,ranking[i+1])){
            i++;
          }
          else if(this.calcTeamPoolPointsTaken(tournamentName,roundN,ranking[i]) > this.calcTeamPoolPointsTaken(tournamentName,roundN,ranking[i+1])){
            let temp = ranking[i];
            ranking[i] = ranking[i+1];
            ranking[i+1] = temp;
            i=0;
          }
        }
      }
    }
    return ranking;
  }

  calcQualifiedTeamRoundAutomate(tournamentName: String, roundN: number){
    let round = this.getRoundByNumber(tournamentName,roundN);
    let listQualified = [];
    for(let i = 0; i<round.length;i++){
      let res = this.rankingTeamByScore(tournamentName,roundN,i);
      let nbQualified = Math.floor(res.length/2) + res.length%2;
      this.m(nbQualified);
      for(let j = 0; j < nbQualified; j++){
        listQualified.push(res[j]);
      }
    }
    return listQualified;
  }

  getTeamsFromPool(tournamentName: String, roundN: number, poolN: number){
    return this.getPoolFromRound(tournamentName, roundN, poolN)[0];
  }

  getTeamName(tournamentName: string, numTeam: number){
    return this.getTeam(tournamentName, numTeam)[0];
  }

  getScoreFromMatch(tournamentName: string, numRound: number, numPoule: number, numMatch: number){
    return this.getMatchsFromPool(tournamentName, numRound, numPoule)[numMatch][2];
  }
}