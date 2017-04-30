import React from 'react';
import ReactDOM from 'react-dom';



class Root extends React.Component {
  constructor(){
    super();
    this.date = new Date();
    this.hours = this.date.getHours();
    this.isAm = this.hours <= 12 ? true : false;

    if(this.hours > 12){
      this.hours -= 12;
    }

    this.state = {
      hours: this.hours,
      minutes: this.date.getMinutes(),
      seconds: this.date.getSeconds(),
      isAm: this.isAm
    };

    this.incrementTime();
  }

  incrementTime(){
    setInterval(this.incrementSeconds.bind(this), 1000);
  }

  stringTime(num){
    let stringNum = String(num);

    if(num < 10){
      stringNum = '0' + stringNum;
    }

    return stringNum;
  }

  incrementSeconds(){
    let sec = this.state.seconds;
    sec += 1;

    if (sec > 59){
      sec = 0;
      this.incrementMinutes();
    }

    this.setState({seconds: sec});
  }

  incrementMinutes(){
    let min = this.state.minutes;
    min += 1;

    if(min > 59){
      min = 0;
      this.incrementHours();
    }

    this.setState({minutes: min});
  }

  incrementHours(){
    let hour = this.state.hours;
    hour += 1;

    if(hour > 12){
      hour = 1;
      this.isAm = !this.isAm;
      this.setState({isAm: this.isAm});
    }

    this.setState({hours: hour});
  }

  render(){
    let amPm = this.state.isAm ? "AM" : "PM";
    return(
      <div>
        <span>{this.stringTime(this.state.hours)}:</span>
        <span>{this.stringTime(this.state.minutes)}:</span>
        <span>{this.stringTime(this.state.seconds)}</span>
        <span> {amPm}</span>
      </div>
    );
  }
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(<Root/>, document.getElementById('main'));
});
