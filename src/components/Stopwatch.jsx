import React from "react";

export default class Stopwatch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timerOn: false,
      start: 0,
      time: 0,
    };
  }
  timerStart = () => {
    this.setState({
      timerOn: true,
      start: Date.now() - this.state.time,
    });
    this.timer = setInterval(() => {
      this.setState({
        time: Date.now() - this.state.start,
      });
    }, 10);
  };
  timerStop = () => {
    this.setState({ timerOn: false });
    clearInterval(this.timer);
  };
  componentWillUnmount() {
    clearInterval(this.timer);
  }
  timerReset = () => {
    this.setState({
      start: 0,
      time: 0,
    });
  };
  render() {
    let { time, timerOn } = this.state;

    let centiSeconds = ("0" + Math.floor((time / 10) % 100)).slice(-2);
    let seconds = ("0" + Math.floor((time / 1000) % 60)).slice(-2);
    let minutes = ("0" + Math.floor((time / 60000) % 60)).slice(-2);
    let hours = ("0" + Math.floor(time / 3600000)).slice(-2);
    return (
      <div className="stopwatch">
        <h2>Stopwatch</h2>
        <div className=" time">
          {hours} : {minutes} : {seconds} : {centiSeconds}
        </div>
        <div>
          {timerOn === false && time === 0 && (
            <button onClick={this.timerStart}>Start</button>
          )}
          {timerOn === true && <button onClick={this.timerStop}>Stop</button>}
          {timerOn === false && time > 0 && (
            <button onClick={this.timerStart}>Resume</button>
          )}
          {timerOn === false && time > 0 && (
            <button onClick={this.timerReset}>Reset</button>
          )}
        </div>
      </div>
    );
  }
}
