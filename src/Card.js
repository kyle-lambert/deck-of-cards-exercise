import React, { Component } from "react";
import "./index.css";

class Card extends Component {
  render() {
    return (
      <img
        style={{
          transform: `rotateZ(${this.props.degrees}deg)`
        }}
        className="Card"
        src={this.props.image}></img>
    );
  }
}

export default Card;
