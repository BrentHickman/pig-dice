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
function handleHold(playerId){
  document.getElementById("play1").disabled = true;
  document.getElementById("hold1").disabled = true;
  const player1 = scoresDB.findPlayer(playerId);
  let player1Div = document.querySelector("div#totalP1");
  player1Div.innerText = null;
  const ul = document.createElement("ul");
  const li = document.createElement("li");
  li.append(player1.totalScore);
  ul.append(li);
  player1Div.append(ul);
  document.getElementById("play2").disabled = false;
  document.getElementById("hold2").disabled = false;
  }



function switchFunc(id, player1, currentRoll,currentScore){
  
  switch(id){
    case 1:   
      handlePlaySubmission1(player1,currentRoll,currentScore);
      break;
      case 2:
      handlePlaySubmission2(currentRoll);
      break;
  }
}

function handlePlaySubmission1(player1, currentRoll,currentScore){

  if(currentRoll <= 1)
  {
  player1.totalScore = 0;
  document.querySelector("div#rollP1").innerText = " Current Roll: " + player1.currentRoll;
  document.querySelector("div#scoreP1").innerText = player1.totalScore;
  document.getElementById("play1").disabled = true;
  document.getElementById("hold1").disabled = true
}
  else {
    
    player1.addScore(scoresDB, player1, currentScore);
    document.querySelector("div#rollP1").innerText = "Current Roll: " + player1.currentRoll;
    document.querySelector("div#scoreP1").innerText = "Current Score: " + player1.currentScore;
  }
}

function handlePlaySubmission2(player,currentRoll,currentScore){
  if(currentRoll <= 1)
  {
  player.totalScore = 0;
  document.querySelector("div#rollP2").innerText = " Current Roll: " + player.currentRoll;
  document.querySelector("div#scoreP2").innerText = player.totalScore;
  document.getElementById("play1").disabled = false;
  document.getElementById("hold1").disabled = false;
}
  else {
    
    player.addScore(scoresDB, player, currentScore);
    document.querySelector("div#rollP2").innerText = "Current Roll: " + player.currentRoll;
    document.querySelector("div#scoreP2").innerText = "Current Score: " + player.currentScore;
  }
}


window.addEventListener("load", function(event) {
  let holdButton = document.querySelector("button#hold1");

  let playerId = 1;
  document.querySelector("form#game1").addEventListener("submit", function(event){
    let totalScore = total;
    const currentRoll = rollDice();
    let currentScore = generateTotalScore(currentRoll);
    // let player1 = new Player(currentRoll, currentScore, totalScore);
    tempPlayer1 = scoresDB.addPlayer(player1);
    
    if(currentRoll == 1) {
      let player1 = new Player(currentRoll, currentScore, totalScore);
    }
    
    else {totalScore = total + currentRoll}

    event.preventDefault();
  
  
  
  
  
  });
  
  holdButton.addEventListener("click", function(event){
    handleHold(playerId);
  });

document.querySelector("div#game2").addEventListener("click", function(event){
  const currentRoll = rollDice();
  let currentScore = generateTotalScore(currentRoll);
  switchFunc(player2, currentRoll, currentScore);
  event.preventDefault();



});

})


