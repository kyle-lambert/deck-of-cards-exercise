import React, { Component } from "react";
import Card from "./Card";
import "./index.css";

class Stack extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deck: [],
      id: null,
      remaining: null
    };
    this.handleClick = this.handleClick.bind(this);
  }

  async componentDidMount() {
    const res = await fetch("https://deckofcardsapi.com/api/deck/new/shuffle/");
    const data = await res.json();

    if (data) {
      this.setState({ id: data.deck_id });
    }
  }

  async getRandomCard() {
    const url = `https://deckofcardsapi.com/api/deck/${this.state.id}/draw/`;
    const res = await fetch(url);
    const data = await res.json();

    try {
      const {
        remaining,
        cards: [{ image, code }]
      } = data;

      this.setState(st => ({
        deck: [
          ...st.deck,
          { image, code, degrees: Math.floor(Math.random() * 360) + 1 }
        ],
        remaining: remaining
      }));
    } catch (error) {
      console.log(error);
      alert("no cards left");
    }
  }

  handleClick() {
    this.getRandomCard();
  }

  render() {
    return (
      <div className="Stack">
        <button className="Stack-button" onClick={this.handleClick}>
          Give me a Card
        </button>
        <div className="Stack-cardarea">
          {this.state.deck.map(card => {
            return (
              <Card key={card.code} image={card.image} degrees={card.degrees} />
            );
          })}
        </div>
      </div>
    );
  }
}

export default Stack;
