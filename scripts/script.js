var indexOne, indexTwo, turns, state, deck;

const imageArr = [
  "images/zero.png",
  "images/one.png",
  "images/two.png",
  "images/three.png",
  "images/four.png",
  "images/five/png",
  "images/six.png",
  "images/seven.png",
];

const deckSize = 16;

class Card {
  constructor(value, image) {
    this.image = image;
    this.value = value;
    this.exposed = false;
    this.matched = false;
  }
  match() {
    this.matched = !this.matched;
  }
  expose() {
    this.exposed = !this.exposed;
  }
}

function newGame() {
  deck = [];
  state = 0;
  turns = 0;

  for (let i = 0; i < deckSize / 2; i++) {
    deck.push(new Card(i, imageArr[i]));
    deck.push(new Card(i, imageArr[i]));
  }
  deck.sort(() => Math.random() - 0.5);
  console.log(deck);
}

// document.querySelector("card").addEventListener('click', function(e){
//     e.target.innerHTML = e.target.innerHTML.strike();
//     setTimeout(function(){e.target.remove()}, 1000);
// });

function flipCard(index) {
  if (deck[index].exposed) {
    return;
  }
  if (state === 0) {
    deck[index].expose();
    indexOne = index;
    state = 1;
  } else if (state === 1) {
    deck[index].expose();
    indexTwo = index;
    state = 0;
    turns++;
    if (deck[indexOne].value === deck[indexTwo].value) {
      deck[indexOne].match();
      deck[indexTwo].match();
    } else {
      setTimeout(function () {
        deck[indexOne].expose();
        deck[indexTwo].expose();
      }, 2000);
    }
  } else {
    console.log("Something fucked up");
  }
}
