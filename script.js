var indexOne, thisOne, indexTwo, thisTwo, turns, state, deck;

const imageArr = [
  "images/Kiss.png",
  "images/Stars.png",
  "images/Eyes.png",
  "images/YUM.png",
  "images/Monkey.png",
  "images/Unicorn.png",
  "images/Wink.png",
  "images/LOL.png",
];
const deckSize = 16;
const cards = document.querySelectorAll(".memory-card");
const turnsCount = document.getElementById("turns");

class Card {
  constructor(value, image) {
    this.image = image;
    this.value = value;
    this.exposed = false;
  }
  expose() {
    this.exposed = !this.exposed;
  }
}

const updateTurns = () => {
  const turnScore = document.querySelector("#turns");
  turnScore.textContent = turns;
};

function newGame() {
  deck = [];
  state = 0;
  turns = 0;
  updateTurns();
  for (let i = 0; i < deckSize / 2; i++) {
    deck.push(new Card(i, imageArr[i]));
    deck.push(new Card(i, imageArr[i]));
  }
  deck.sort(() => Math.random() - 0.5);

  let backs = document.getElementsByClassName("back-face");
  let fronts = document.getElementsByClassName("front-face");
  for (let i = 0; i < backs.length; i++) {
    backs[i].src = deck[i].image;
    fronts[i].src = "images/Trophy.png";
  }
  play();
}

function play() {
  cards.forEach((card) =>
    card.addEventListener("click", function (e) {
      e.preventDefault();
      let index = Number(this.id.slice(1));
      if (deck[index].exposed) {
        return;
      }
      if (state === 0) {
        this.classList.toggle("flip");
        deck[index].expose();
        indexOne = index;
        thisOne = this;
        state = 1;
      } else if (state === 1) {
        this.classList.toggle("flip");
        deck[index].expose();
        indexTwo = index;
        thisTwo = this;
        state = 0;
        turns++;
        updateTurns();
        if (deck[indexOne].value != deck[indexTwo].value) {
          setTimeout(function () {
            deck[indexOne].expose();
            thisOne.classList.toggle("flip");
            deck[indexTwo].expose();
            thisTwo.classList.toggle("flip");
          }, 600);
        }
      } else {
        console.log("Something fucked up");
      }
    })
  );
}

function reset() {
  if (deck) {
    cards.forEach((card) => {
      let index = Number(card.id.slice(1));
      if (deck[index].exposed) {
        card.classList.toggle("flip");
      }
    });
  }
  setTimeout(function () {
    newGame();
  }, 1000);
}
newGame();
