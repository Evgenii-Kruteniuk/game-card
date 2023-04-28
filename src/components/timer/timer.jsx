import React, { Component, useState } from "react";
import "./timer.css";

export default class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      seconds: 0,
    };
  }

  tick() {
    this.setState((state) => ({
      seconds: state.seconds + 1,
    }));
  }

  componentDidMount() {
    this.interval = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  clearTimer = () => {
    this.state.seconds = -1;
  };

  render() {
    return (
      <div>
        <div className="timer">Секунды: {this.state.seconds}</div>;
        <button onClick={this.clearTimer}>clear</button>
      </div>
    );
  }
}
