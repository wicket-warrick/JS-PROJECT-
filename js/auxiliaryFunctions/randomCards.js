"use strict";
export const randomizeCards = () => {
  const arrayGrid = new Array(16);

  for (let i = 0; i < arrayGrid.length; i++) {
    let randomGrid = Math.floor(Math.random() * 16 + 1);
    while (arrayGrid.includes(randomGrid)) {
      randomGrid = Math.floor(Math.random() * 16 + 1);
    }
    arrayGrid[i] = randomGrid;
  }

  const playBoard = document.querySelector("#playboard");
  const collection = playBoard.getElementsByClassName("card");

  for (let i = 0; i < arrayGrid.length; i++) {
    collection[i].style.gridArea = "card" + arrayGrid[i];
  }
};
