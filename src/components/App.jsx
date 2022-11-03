import React from "react";
import Countdown from "./Countdown";
import Stopwatch from "./Stopwatch";

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      countdown: false,
      stopwatch: false,
    };
  }

  render() {
    return (
      <div className="container">
        <h1>Timers</h1>
        <div className="flex timers">
          {!this.state.stopwatch ? (
            <button
              className="show-stopwatch "
              onClick={() => this.setState({ stopwatch: true })}
            >
              Show Stopwatch
            </button>
          ) : (
            <Stopwatch />
          )}
          {!this.state.countdown ? (
            <button
              className="show-countdown "
              onClick={() => this.setState({ countdown: true })}
            >
              Show Countdown
            </button>
          ) : (
            <Countdown />
          )}
        </div>
      </div>
    );
  }
}
