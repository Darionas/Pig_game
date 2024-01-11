/*'Use strict'*/
/*jshint esversion: 8*/

// get access to webpage elements
const score_0 = document.getElementById('score__0');
const score_1 = document.getElementById('score__1');
const dice = document.querySelector('.dice');
const rollDice = document.querySelector('.btn__roll');
const player_0 = document.querySelector('.player__0');
const player_1 = document.querySelector('.player__1');
const min = window.matchMedia("(max-width: 768px)");
const holdBtn = document.querySelector('.btn__hold');
const newBtn = document.querySelector('.btn__new');
const name_0 = document.getElementById('name__0');
const name_1 = document.getElementById('name__1');
let current_0 = document.getElementById('current__0');
let current_1 = document.getElementById('current__1');
let current = 0;
let activePlayer = 0;
let scores = [0, 0];
let active_0, active_1;

//initialize the values to zero
score_0.textContent = 0; 
score_1.textContent = 0;
dice.classList.add('hidden');

//player's switcher
function switchPlayer() {
    current = 0;
    document.getElementById(`current__${activePlayer}`).textContent = current;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player_0.classList.toggle('player__active');
    player_1.classList.toggle('player__active');
}

//implement functionality for roll dice button
rollDice.addEventListener('click', function() {
    //1.generate random number 1 and 6
    let diceNumber = Math.trunc(Math.random() * 6) + 1;
    //console.log(diceNumber);
    
    //2.display the dice image with the random number
    dice.classList.remove('hidden');
    dice.src = `dices/dice_${diceNumber}.png`
    dice.setAttribute('alt', `dice ${diceNumber}`)
    
    //3.if the random number is not 1 then add it to active player's current score
    if(diceNumber != 1) {
        current += diceNumber;
        document.getElementById(`current__${activePlayer}`).textContent = current;
        //currentScore_0.textContent = current_0;
    } else {
    //4.if random number is 1 then reset current score to zero and change the active player
        switchPlayer();
        active();
    }
})


//switching player's card's on mobile screen
window.onresize = active;
function active() {
    active_0 = player_0.getAttribute('class').includes('player__active');
    active_1 = player_1.getAttribute('class').includes('player__active');
    if(min.matches === true) {
        if(active_0 == true) {
            player_0.classList.remove('hidden');
            player_1.classList.add('hidden');
        }  else {
            player_0.classList.add('hidden');
        }
        
        if(active_1 == false) {
            player_0.classList.remove('hidden');
            player_1.classList.add('hidden');
        } else {
            player_1.classList.remove('hidden');
        }
        
    } else {
        player_0.classList.remove('hidden');
    }
}
active();

//Implementing hold buttom functionality
holdBtn.addEventListener('click', function() {
    //1.add current score to global score
    scores[activePlayer] += current;
    document.getElementById(`score__${activePlayer}`).textContent = scores[activePlayer];
    document.getElementById(`current__${activePlayer}`).textContent = 0;
    
    //2.check if the player has already reached maximum score
    if(scores[activePlayer] >= 100) {
        //finish the game
        document.querySelector(`.player__${activePlayer}`).classList.add('player__winner');
        //document.querySelector(`.player__${activePlayer}`).classList.remove('player__active');
        document.getElementById(`name__${activePlayer}`).textContent = `Player ${activePlayer + 1} Winner!`;
        dice.classList.add('hidden');
        rollDice.classList.add('hidden');
        holdBtn.classList.add('hidden');
    } else {
        switchPlayer();
        active();
    }
})


//Start the new game 
newBtn.addEventListener('click', function() {
    score_0.textContent = 0; 
    score_1.textContent = 0;
    
    current_0.textContent = 0;
    current_1.textContent = 0;
    
    player_0.classList.remove('player__winner');
    player_1.classList.remove('player__winner');
    
    player_0.classList.add('player__active');
    player_1.classList.remove('player__active');
    
    rollDice.classList.remove('hidden');
    holdBtn.classList.remove('hidden');
    
    current = 0;
    activePlayer = 0;
    scores = [0, 0];
    
    name_0.textContent = 'Player 1';
    name_1.textContent = 'Player 2';
    
    active();
})









