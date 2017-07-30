import React, { Component } from "react";

import Deck from "../../../dist/react-deck";
require("../../../dist/styles.css");

const range = (start, count) =>
  Array.apply(0, Array(count)).map((element, index) => {
    return index + start;
  });

function shuffle(array) {
  const copy = [];
  let n = array.length;
  let i;

  // While there remain elements to shuffle…
  while (n) {
    // Pick a remaining element…
    i = Math.floor(Math.random() * array.length);

    // If not already shuffled, move it to the new array.
    if (i in array) {
      copy.push(array[i]);
      delete array[i];
      n--;
    }
  }

  return copy;
}

const suits = ["d", "c", "h", "s"];
const ranks = [
  "A",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "J",
  "Q",
  "K"
];

const getDeck = () =>
  shuffle(
    ranks
      .map(r => suits.map(s => r + s))
      .reduce((prev, curr) => prev.concat(curr))
  );

class AppContainer extends Component {
  constructor(props) {
    super(props);
    this.state = { board: [], deck: getDeck() };
    this.progressDeal = this.progressDeal.bind(this);
  }

  newRound() {
    const { deck, board } = this.state;

    const newDeck = getDeck();
    this.setState(Object.assign({}, { board: [], deck: newDeck }));
  }

  dealFlop() {
    const { deck, board } = this.state;
    const flop = range(0, 3).map(e => deck.pop());

    this.setState(Object.assign({}, { board: flop, deck }));
  }

  dealCard() {
    const { deck, board } = this.state;
    const card = deck.pop();

    this.setState(Object.assign({}, { deck, board: board.concat(card) }));
  }

  progressDeal() {
    const { deck, board } = this.state;

    if (board.length === 0) {
      this.dealFlop();
      return;
    }

    if (board.length === 5) {
      this.newRound();
    } else {
      this.dealCard();
    }
  }

  render() {
    const { board } = this.state;

    return (
      <div>
        <button onClick={this.progressDeal} />
        <Deck
          board={board}
          boardXoffset={575}
          boardYoffset={400}
          height={200}
        />
      </div>
    );
  }
}

export default AppContainer;
