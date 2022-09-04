const mainDice = document.querySelector(".rollingdice");

const player = document.querySelector("#playerstatus");
const playerBox = document.querySelector(".box-for-player");
const playerScore = document.querySelector("#p-score");

const dealer = document.querySelector("#dealerstatus");
const dealerBox= document.querySelector(".box-for-dealer");
const dealerScore = document.querySelector("#d-score");

const rolltheDice = document.querySelector(".rollButton"); //Click here to roll the dice
const addPoints = document.querySelector(".addButton"); //Click here to add points to current score
const playNewGame = document.querySelector(".newGame"); //Click here to Start a new game

const modal = document.getElementById("custom-modal"); //This pop ups whenever Player Wins
const span = document.getElementsByClassName("x-out")[0]; //Click here to x-out of box

const dealerModal = document.getElementById("dealer-modal"); //This pops up whenever Dealer Wins
const closeDealerModal = document.getElementsByClassName("close-box")[0]; //click here to x-out

//Sounds for buttons and Modal boxes
const diceSound = new Audio();
diceSound.src = "rolldice.wav";
const pointsSound = new Audio();
pointsSound.src = "points.wav";
const newGameSound = new Audio();
newGameSound.src = "newgame.wav";

const playerSound = new Audio();
playerSound.src = "playerSound.mp3";
const dealerSound = new Audio();
dealerSound.src = "dealerSound.mp3"

const closeSound = new Audio();
closeSound.src = "closebox.mp3";
//-------------

let counter = 0;
let totalScoreOfPlayer = 0;
let totalScoreOfDealer = 0;

//----FUNCTIONS TO BE USED IN THE GAME-------

//face of the dice will appear here
function dicePicture(num) {
  let newDice = `red${num}.jpg`;
  mainDice.setAttribute("src", newDice);
}

function randomDice() {
  return Math.floor(Math.random() * 6) + 1;
}

//this will reset the game and set player and dealer total score 0
function resetGame() {
  mainDice.style.display = "none";
  player.textContent = 0;
  dealer.textContent = 0;
  playerScore.textContent = 0;
  dealerScore.textContent = 0;
  totalScoreOfPlayer = 0;
  totalScoreOfDealer = 0;
  counter = 0;
  if (!playerBox.classList.contains("active")) {
    playerBox.classList.toggle("active");
    dealerBox.classList.toggle("active");
  }
}
//-------------------------------
  mainDice.style.display = "none";

//When the "Roll the Dice" button is clicked, this is what happens:
  rolltheDice.addEventListener("click", () => {
  diceSound.play();
  let diceNumber = randomDice();
  counter += diceNumber;
  mainDice.style.display = "block";
  dicePicture(diceNumber);
  if (diceNumber !== 1) {
    if (playerBox.classList.contains("active")) {
      player.textContent = counter;
    } else {
      dealer.textContent = counter;
    }
  } else {
    counter = 0;
    player.textContent = 0;
    dealer.textContent = 0;
    playerBox.classList.toggle("active");
    dealerBox.classList.toggle("active");
  }
});

//When the "Add Points To Current Score", this is what happens:
addPoints.addEventListener("click", () => {
  pointsSound.play();
  if (playerBox.classList.contains("active")) {
    totalScoreOfPlayer += counter;
    playerScore.textContent = totalScoreOfPlayer;
    player.textContent = 0;

    if (totalScoreOfPlayer >= 20) {
      playerSound.play();
      modal.style.display = "block";
      resetGame();
      return;
    }
  } else {
    totalScoreOfDealer += counter;
    dealerScore.textContent = totalScoreOfDealer;
    dealer.textContent = 0;

    if (totalScoreOfDealer >= 20) {
    dealerModal.style.display = "block";
      dealerSound.play();
      resetGame();
      return;
    }
  }
  counter = 0;
  playerBox.classList.toggle("active");
  dealerBox.classList.toggle("active");
});

//When the button "Click Here to Start Over" is clicked, this is what happens:
playNewGame.addEventListener("click", () => {
  newGameSound.play();
  resetGame();
});

//When the X-out button is clicked, Player Modal Box disappears 
span.onclick = function() {
  modal.style.display = "none";
  closeSound.play();
}

//When the X-out button is clicked, Dealer Modal Box disappears 
closeDealerModal.onclick = function() {
  dealerModal.style.display = "none";
  closeSound.play();
}

