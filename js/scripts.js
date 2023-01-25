let total = 0;
let scoresDB = new ScoresDB();
//Business Logic
function ScoresDB(){
  this.players = {};
  this.currentId = 0;
}

ScoresDB.prototype.addPlayer = function(player) {
  player.id = this.assignId();
  this.players[player.id] = player;
};

ScoresDB.prototype.assignId = function() {
  this.currentId += 1;
  return this.currentId;
};

ScoresDB.prototype.findPlayer = function(id) {
  if (this.players[id] !== undefined) {
    return this.players[id];
  }
  return false;
};

Player.prototype.addScore = function(scoreDBInstance, currentScore) {

  Object.keys(scoreDBInstance.players).forEach(function(key) {
    const player = scoreDBInstance.findPlayer(key);
    player.totalScore = currentScore;
  });
  
  
  
  player.totalScore = total + currentScore;
}

function Player(currentRoll, currentScore, totalScore){
  this.currentRoll = currentRoll;
  this.currentScore = currentScore;
  this.totalScore = totalScore;
};

function rollDice(){
  const rndInt = Math.floor(Math.random() *6) +1;
  return rndInt;
};

function generateTotalScore(currentRoll){
  total = currentRoll + total;
  return total;
};

// UI Logic
function handleHold(currentRoll){
  const player1 = scoresDB.findPlayer(1);
  let totalScore1 = player1.currentScore;
    document.getElementById("play1").disabled = true;
    document.getElementById("hold1").disabled = true;
    window.alert("current score:" + totalScore1);
}

function handlePlaySubmission(currentRoll){
  let totalScore = total;
  let currentScore = generateTotalScore(currentRoll);

  let player1 = new Player(currentRoll, currentScore, totalScore);
  scoresDB.addPlayer(player1);


  if(currentRoll <= 1)
  {
  player1.totalScore = 0;
  document.querySelector("div#rollP1").innerText = " Current Roll: " + player1.currentRoll;
  document.querySelector("div#scoreP1").innerText = player1.totalScore;
  document.getElementById("play1").disabled = true;
  document.getElementById("hold1").disabled = true
}
  
  else {
    
    let foundPlayer = scoresDB.findPlayer(1);
    player1.addScore(foundPlayer, currentScore);
    document.querySelector("div#rollP1").innerText = "Current Roll: " + player1.currentRoll;
    document.querySelector("div#scoreP1").innerText = "Current Score: " + player1.currentScore;
  }

}

window.addEventListener("load", function(event) {

  const currentRoll = rollDice();
  let holdButton = document.querySelector("button#hold1");
  document.querySelector("form#game1").addEventListener("submit", function(event){
    handlePlaySubmission(currentRoll);
    event.preventDefault();
  });
  
  
  
  holdButton.addEventListener("click", function(event){
    handleHold(currentRoll);
  });
  // document.querySelector("form#game2").addEventListener("submit", handlePlaySubmission);

})

