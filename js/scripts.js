let total = 0;

//Business Logic

function Player(currentRoll, totalScore){
  this.currentRoll = currentRoll;
  this.totalScore = totalScore;
}

function rollDice(){
  const rndInt = Math.floor(Math.random() *6) +1;
  return rndInt;
}

function generateTotalScore(result){
  total = result + total;
  return total;
}

// UI Logic

function handleHold(){
  document.getElementById("play1").disabled = true;
  document.getElementById("hold1").disabled = true;
  document.getElementById("play2").disabled = false;
  document.getElementById("hold2").disabled = false;
}

function handlePlaySubmission(event){
  event.preventDefault();


  const currentRoll = rollDice();
  let totalScore = "Current Score: " + generateTotalScore(currentRoll);
  let player1 = new Player(currentRoll, totalScore);
  
  document.querySelector("div#rollP1").innerText = " Current Roll: " + player1.currentRoll;
  document.querySelector("div#scoreP1").innerText = player1.totalScore;

}

window.addEventListener("load", function() {
  let holdButton = document.querySelector("button#hold1");
  document.querySelector("form#game1").addEventListener("submit", handlePlaySubmission);
  holdButton.addEventListener("click", handleHold);
  document.querySelector("form#game2").addEventListener("submit", handlePlaySubmission);

})

