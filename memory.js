class MemoryGame {
  constructor(deckSize, images, frontImage) {
    this.frontImage = frontImage;
    this.deck = new Deck();
    for (let i = 0; i < deckSize / 2; i++) {
        this.deck.addCard(new Card(i, images[i]));
        this.deck.addCard(new Card(i, images[i]));
    }
    this.start();
  }
  draw() {
    const cards = document.querySelectorAll(".memory-card");
    let backs = document.getElementsByClassName("back-face");
    for (let i = 0; i < cards.length; i++) {
      let card = this.deck.getCardByIndex(i);
      card.setElement(cards[i]);
      backs[i].src = this.deck.getCardByIndex(i).image;
    }
    let that = this;
    this.deck.cards.forEach((card) =>
      card.element.addEventListener("click", function (e) {
        that.evalClick(this);
      })
    );
  }
  start() {
    this.deck.shuffle();
    this.draw();
    this.matched = [];
    this.clicked = [];
    this.updateTurns(true);
  }
  reset() {
    let that = this;
    this.matched.forEach((card) => {card.flip();});
    this.clicked.forEach((card) => {card.flip();});
    setTimeout(function () {that.start();}, 500);
  }
  evalClick(that) {
    let newCard = this.deck.getCardById(that.id);
    if (newCard.faceUp || this.clicked.length === 2) return;
    this.clicked.push(newCard);
    newCard.flip();
    if (this.clicked.length === 2) {
      this.updateTurns();
      if (this.clicked[0].value != this.clicked[1].value) {
        let that = this;
        setTimeout(function () {
          that.clicked[0].flip();
          that.clicked[1].flip();
          that.clicked = [];
        }, 700);
      } else {
        this.clicked.forEach((card) => {this.matched.push(card);});
        this.checkWin();
        this.clicked = [];
      }
    }
  }
  updateTurns(reset = false) {
    const turnScore = document.querySelector("#turns");
    if (reset) this.turns = 0;
    else this.turns++;
    turnScore.textContent = this.turns;
  }
  checkWin() {
    if (this.matched.length === this.deck.length()) {
      setTimeout(function () {
        alert("You won!");
      }, 700);
    }
  }
}

class Deck {
  constructor() {
    this.cards = [];
  }
  shuffle() {
    this.cards.sort(() => Math.random() - 0.5);
  }
  addCard(card) {
    this.cards.push(card);
  }
  getCardByIndex(index) {
    return this.cards[index];
  }
  getCardById(id) {
    return this.cards.filter((card) => card.element.id === id)[0];
  }
  length() {
    return this.cards.length;
  }
}

class Card {
  constructor(value, image) {
    this.image = image;
    this.value = value;
    this.faceUp = false;
    this.element = null;
  }
  flip() {
    this.faceUp = !this.faceUp;
    this.element.classList.toggle("flip");
  }
  setElement(element) {
    this.element = element;
  }
}
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

let game = new MemoryGame(deckSize, imageArr, "images/Unicorn.png");