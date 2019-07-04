/*
 * Create a list that holds all of your cards
 */

let cards = document.querySelectorAll('.card');
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

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

// Loop through each card and create its HTML
function reset() {
  for (let i = 0; i < cards.length; i++) {
    shuffle(cards);
    cards[i].classList.remove('match', 'open', 'show'); //removes match, open and show classes
    document.querySelector('.moves').textContent = '0';
  }

}
reset();



/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
let card = document.querySelector('.deck');
card.addEventListener('click', respondToCardClick);
let openCards = document.querySelector('.open');
let matchedCards = document.querySelectorAll('.match');
let numMoves = 0;
let moves = document.querySelector('.moves');


function respondToCardClick(evt) {
  if (evt.target.nodeName === 'LI') {
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

   } else {
     if (openCards.isEqualNode(evt.target)){
       matched(evt.target, openCards);
     }
     else {
       noMatch(evt.target, openCards);
     }
   }
    moveCounter();
  }
}

function matched(card1, card2) {
  card1.classList.toggle('match', 'open', 'show');
  card2.classList.toggle('match', 'open', 'show');
  openCards = null;
}

function noMatch(card1, card2){
  card1.classList.remove('open', 'show');
  card2.classList.remove('open', 'show');
  openCards = null;
}

function moveCounter(){

  numMoves++;
  moves.textContent = numMoves;
  console.log('Number of moves: ' + numMoves);
}
