import React from "react";

export default class Countdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timerOn: false,
      start: 0,
      time: 0,
    };
  }
  startTimer = () => {
    this.setState({
      timerOn: true,
      start: this.state.time,
    });
    this.timer = setInterval(() => {
      const newTime = this.state.time - 10;
      if (newTime >= 0) {
        this.setState({
          time: newTime,
        });
      } else {
        clearInterval(this.timer);
        this.setState({ timerOn: false });
        alert("countdown ended");
      }
    }, 10);
  };

  stopTimer = () => {
    clearInterval(this.timer);
    this.setState({ timerOn: false });
  };
  resetTimer = () => {
    if (this.state.timerOn === false) {
      this.setState({
        time: this.state.start,
      });
    }
  };
  updateTime = (input) => {
    const { time, timerOn } = this.state;
    let newTime = "";
    if (!timerOn) {
      switch (input) {
        case "increaseHours":
          newTime = time + 3600000;
          break;
        case "decreaseHours":
          newTime = time - 3600000;
          break;
        case "increaseMinutes":
          newTime = time + 60000;
          break;
        case "decreaseMinutes":
          newTime = time - 60000;
          break;
        case "increaseSeconds":
          newTime = time + 1000;
          break;
        case "decreaseSeconds":
          newTime = time - 1000;
          break;
        default:
          break;
      }
    }
    this.setState({
      time: newTime,
    });
  };
  componentWillUnmount() {
    clearInterval(this.timer);
  }
  render() {
    const { time, start, timerOn } = this.state;
    let seconds = ("0" + (Math.floor((time / 1000) % 60) % 60)).slice(-2);
    let minutes = ("0" + Math.floor((time / 60000) % 60)).slice(-2);
    let hours = ("0" + Math.floor((time / 3600000) % 60)).slice(-2);
    return (
      <div className="countdown">
        <h2>Countdown</h2>
        <p>Hours : Minutes : Seconds</p>
        <div>
          <div className="flex buttons-wrapper">
            <button onClick={() => this.updateTime("increaseHours")}>
              &#8593;
            </button>
            <button onClick={() => this.updateTime("increaseMinutes")}>
              &#8593;
            </button>
            <button onClick={() => this.updateTime("increaseSeconds")}>
              &#8593;
            </button>
          </div>
          <div className="countdown-time">
            {hours} : {minutes} : {seconds}
          </div>
          <div className="flex buttons-wrapper">
            <button onClick={() => this.updateTime("decreaseHours")}>
              &#8595;
            </button>
            <button onClick={() => this.updateTime("decreaseMinutes")}>
              &#8595;
            </button>
            <button onClick={() => this.updateTime("decreaseSeconds")}>
              &#8595;
            </button>
          </div>
          {timerOn === false && (start === 0 || time === start) && (
            <button className="Button" onClick={this.startTimer}>
              Start
            </button>
          )}
          {timerOn === true && time >= 1000 && (
            <button className="Button" onClick={this.stopTimer}>
              Stop
            </button>
          )}
          {timerOn === false && start !== 0 && start !== time && time !== 0 && (
            <button className="Button" onClick={this.startTimer}>
              Resume
            </button>
          )}

          {(timerOn === false || time < 1000) && start !== time && start > 0 && (
            <button className="Button" onClick={this.resetTimer}>
              Reset
            </button>
          )}
        </div>
      </div>
    );
  }
}
