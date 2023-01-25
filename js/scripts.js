let total = 0;

function Player(currentScore, currentRoll, totalScore){
  this.currentRoll = currentRoll;
  this.currentScore = currentScore;
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

function handlePlaySubmission(event){
  event.preventDefault();


  const result = rollDice();
  let printDiceTotal = "Current Score: " + generateTotalScore(result);

  
  document.querySelector("div#rollP1").innerText = " Current Roll: " + result;
  document.querySelector("div#scoreP1").innerText = printDiceTotal;

}

window.addEventListener("load", function() {
  document.querySelector("form#game").addEventListener("submit", handlePlaySubmission);
})

