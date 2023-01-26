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

Player.prototype.addScore = function(scoreDBInstance, id, currentScore) {
  
Object.keys(scoreDBInstance.players).forEach(function(id) {
    const player = scoreDBInstance.findPlayer(id);
    player.totalScore = currentScore;
  });
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
function handleHold(){
  document.getElementById("play1").disabled = true;
  document.getElementById("hold1").disabled = true;
  const player1 = scoresDB.findPlayer(1);
  let player1Div = document.querySelector("div#totalP1");
  player1Div.innerText = null;
  const ul = document.createElement("ul");
  const li = document.createElement("li");
  li.append(player1.totalScore);
  ul.append(li);
  player1Div.append(ul);
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
    player1.addScore(scoresDB ,foundPlayer, currentScore);
    document.querySelector("div#rollP1").innerText = "Current Roll: " + player1.currentRoll;
    document.querySelector("div#scoreP1").innerText = "Current Score: " + player1.currentScore;
  }

}

window.addEventListener("load", function(event) {


  let holdButton = document.querySelector("button#hold1");
  document.querySelector("form#game1").addEventListener("submit", function(event){
    const currentRoll = rollDice();
    handlePlaySubmission(currentRoll);
    event.preventDefault();
  });
  
  
  
  holdButton.addEventListener("click", function(event){
    handleHold();
  });
  // document.querySelector("form#game2").addEventListener("submit", handlePlaySubmission);

})

