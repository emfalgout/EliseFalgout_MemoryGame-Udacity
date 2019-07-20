/*
 * Create a list that holds all the cards
 */

let cards = document.querySelectorAll('.card');
let cardNum = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

/*
 * Reset the board
 */
function reset() {
  cardNum = shuffle(cardNum); // Shuffle card order
  reorderCards(cardNum); // Reorder the cards
  document.querySelector('.moves').textContent = '0'; // Reset the move counter

   // Loop through all the cards and make them "face down"
  for (let i = 0; i < cards.length; i++) {
    cards[i].classList.remove('match', 'open', 'show'); //removes match, open and show classes
  }

  card = document.querySelector('.deck'); // update the deck
  openCards = document.querySelector('.open'); // update the open cards list
  moves = document.querySelector('.moves'); // reset the counter
  numMoves = 0; // make the number of moves 0
  stars.firstElementChild.setAttribute('style', 'display: inline-block;'); // display first star
  stars.lastElementChild.setAttribute('style', 'display: inline-block;'); // display last star
  timer.setAttribute('style', 'padding-left: 25px; display: none;'); // hide timer
  timer.textContent = '0s'; // reset initial stopwatch display
  time = 0; // reset time second counter
  numStars = 3; // reset number of stars
}

/*
 * Reorders the cards to reflect the new order given by the shuffle function
 */
function reorderCards(cardNum) {
  for (let i = 0; i < cardNum.length; i++) {
    cards[cardNum[i]].style.order = i;
  }
}

 /*
  * Declares all variables
  */
let card = document.querySelector('.deck');
let openCards = document.querySelector('.open');
let moves = document.querySelector('.moves');
const resetButton = document.querySelector('.restart');
let stars = document.querySelector('.stars');
let numMoves = 0;
card.addEventListener('click', respondToCardClick);
resetButton.addEventListener('click', respondToResetClick);
let time = 0;
let stopwatch;
let timer = document.querySelector('.timer');
let numStars = 3;
let playAgainBttn = document.querySelector('.play-again');
playAgainBttn.addEventListener('click', respondToPlayClick);
reset();

/*
 * Respond to a card being clicked
 */
function respondToCardClick(evt) {
  if (evt.target.nodeName === 'LI' && evt.target.className === 'card') {
    if (numMoves === 0) {
      stopwatch = setInterval(getTotalTime, 1000);
      timer.setAttribute('style', 'padding-left: 25px; display: inline-block;');
    }
    evt.target.classList.add('open', 'show');
    /*
     * Checks to see if a card is open or not.
     * If there are no cards open, set the clicked card to openCard
     * If there is a card open, check to see if they are the same card
     *    If they aren't the same card:
            1) Remove 'open' and 'show' from both cards' class lists
     *    If they are the same card:
     *      1) Remove 'open' and 'show' from both cards' class lists
     *      2) Add 'match' to both cards' class lists
     */
    if (openCards == null){
     openCards = evt.target;
     moveCounter();

   } else {
     if (openCards.firstElementChild.isEqualNode(evt.target.firstElementChild)){
       matched(evt.target, openCards);
     }
     else {
       noMatch(evt.target, openCards);
     }
     openCards = null;
   }
  }
}

/*
 * Cards do match, show an animation and check to see if the game is finished
 */
function matched(card1, card2) {
  card1.classList.toggle('match', 'open', 'show');
  card2.classList.toggle('match', 'open', 'show');
  card1.classList.add('boing');
  card2.classList.add('boing');
  animationEnd(card1, 'boing');
  animationEnd(card2, 'boing');
  moveCounter();
  gameFinished();
}

/*
 * Cards do NOT match, show an animation and reset the cards
 */
function noMatch(card1, card2){
  card1.classList.add('shake');
  card2.classList.add('shake');
  animationEnd(card1, 'shake');
  animationEnd(card2, 'shake');
  moveCounter();
}

/*
 * Update the number of moves taken and check to see if the number of stars needs
 * to be updated.
 */
function moveCounter(){
  numMoves++;
  moves.textContent = numMoves;
  starTracker(numMoves);
}

/*
 * Check to see if the game is finished, if so get the total time and display a modal
 */
function gameFinished(){
  let matchedCards = document.querySelectorAll('.match');
  if (matchedCards.length == cards.length) {
    let totalTime = getTotalTime();
    clearInterval(stopwatch);
    document.querySelector('.modal').style.display = "flex";
    document.querySelector('.game-stats').textContent = numMoves + " moves in " + totalTime + " with " + numStars + " stars!";
  }
}

/*
 * Respond to the reset button being clicked by stopping the timer and resetting the board
 */
function respondToResetClick(e){
  clearInterval(stopwatch);
  reset();
}

/*
 * Check to see if an animation is done before removing it from the class list
 */
function animationEnd(animated, animateClass){
  animated.addEventListener('animationend', () => {
    if (animateClass === 'shake') {
    animated.classList.remove(animateClass, 'open', 'show'); // cards don't match, reset them
  } else {
    animated.classList.remove(animateClass);
  }
  });
}

/*
 * Track the number of stars
 */
function starTracker(num){
  if (num == 22) {
    stars.firstElementChild.setAttribute('style', 'display: none;');
    numStars--;
  } else if (num == 38) {
    stars.lastElementChild.setAttribute('style', 'display: none');
    numStars--;
  }
}

/*
 * Get the total time in seconds if the time is less than a minute and
 * get the total time in minutes and seconds if the time is over a minute
 */
function getTotalTime(){
  time++;
  if (time < 60){
    timer.textContent = time + 's'; // update the displayed timer
    return time + 's';
  } else if (time >= 60){
    let minTime = Math.floor(time / 60);
    let secTime = time - (minTime * 60);
    timer.textContent = minTime + 'm ' + secTime + 's'; // update the displayed timer
    return minTime + 'm ' + secTime.toFixed(0) + 's';
  }
}

/*
 * Respond to the Play again! button being clicked by hiding the modal and
 * resetting the board.
 */
function respondToPlayClick(){
  document.querySelector('.modal').style.display = "none";
  reset();
}
