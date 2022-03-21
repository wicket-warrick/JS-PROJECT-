import { randomizeCards } from "./auxiliaryFunctions/randomCards.js";
import { addIntentCounter } from "./auxiliaryFunctions/addIntentCounter.js";
import {
  putUp,
  putDown,
  removeClickListener,
  addClickListener,
} from "./auxiliaryFunctions/cardsOpations.js";
("use strict");
const rules = document.querySelector("#brief");
const cards = document.querySelectorAll(".card");
const playBoard = document.querySelector("#playboard");
const intents = document.querySelector("#intents");
const divWinMsg = document.querySelector("#win-msg");

let points = 0;
let card1;
let card1Value;
let card2;
let card2Value;

const startButton = document.querySelector("#start");

const compareCards = (e) => {
  const currentCard = e.currentTarget;
  putUp(currentCard);
  card1 = currentCard;
  card1Value = currentCard.dataset.cardImg;
  removeClickListener(cards, compareCards);
  addClickListener(cards, reveal);

  const idInterval = setInterval(() => {
    if (card1Value && card2Value) {
      if (card1Value === card2Value) {
        points++;
      } else {
        setTimeout(() => {
          putDown(card1);
          putDown(card2);
        }, 1000);
      }
      clearInterval(idInterval);

      card1Value = "";
      card2Value = "";
      addIntentCounter();
      if (points === 8) {
        win();
      }
      setTimeout(() => {
        addClickListener(cards, compareCards);
      }, 1000);
    }
  }, 200);
};

const reveal = (e) => {
  const currentCard = e.currentTarget;
  putUp(currentCard);
  card2 = currentCard;
  card2Value = currentCard.dataset.cardImg;
  removeClickListener(cards, reveal);
};

const startGame = () => {
  points = 0;
  randomizeCards();
  startButton.classList.add("hidden");
  setTimeout(() => {
    playBoard.classList.remove("hidden");
  }, 1000);
};

const win = () => {
  rules.classList.add("hidden");
  rules.classList.add("display-none");

  divWinMsg.firstElementChild.textContent = `Felicidades has encontrado todas las parejas en ${intents.textContent} intentos.`;
  divWinMsg.lastElementChild.innerHTML =
    "Si quieres jugar otra partida pulsa <strong style='color:white;'> RESET </strong>";
  playBoard.classList.add("hidden");
  divWinMsg.classList.remove("hidden");
};

startButton.addEventListener("click", startGame);
addClickListener(cards, compareCards);

const reset = document.querySelector("#reset");
reset.addEventListener("click", () => {
  if (points === 8) {
    rules.classList.toggle("hidden");
    rules.classList.toggle("display-none");
    divWinMsg.classList.toggle("hidden");
    playBoard.classList.toggle("hidden");
  }
  intents.textContent = 0;
  points = 0;
  for (const card of cards) {
    card.classList.remove("flipped");
  }
  setTimeout(randomizeCards, 1000);
});
