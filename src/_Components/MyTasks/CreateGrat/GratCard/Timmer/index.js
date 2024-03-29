import React, { Component } from 'react';
import { Progress, Card, Label } from 'semantic-ui-react';


class Timmer extends Component {

  state = {
    currentTime: new Date(),
    timer: {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0
    },
    percent: 0
  };

  componentDidMount() {
    let startTime = new Date(this.props.startTime);
    // SETS THE TICK FUNCTION TO FIRE EVERYSECOND
    this.timerID = setInterval(() => this.tick(startTime), 1000);
  }

  componentWillUnmount() {

    // UNMOUNTS SET INTERVAL
    clearInterval(this.timerID);
  }
  
  // UPDATES TIME STATE
  tick(startTime) {
    const now = new Date().getTime();
    const timePassed = Math.round((now - startTime.getTime())/1000);

    let diff = timePassed;
    let days = Math.floor(diff/(24*60*60)); 
    diff = diff-(days*24*60*60);
    let hours = Math.floor(diff/(60*60));
    diff = diff-(hours*60*60);
    let minutes = Math.floor(diff/(60));
    diff = diff-(minutes*60);
    let seconds = diff;

    const percentSeconds = 100 / 60;
    const percent =  (this.state.timer.seconds) * percentSeconds;

    this.setState({
      timer: {
        days: days,
        hours: hours,
        minutes: minutes,
        seconds: seconds,
      },
      percent: percent
    });

    this.setState({timePassed});
    
  }

  render() {
    
    const { days, hours, minutes } = this.state.timer;


    return (
      <React.Fragment>
        <Card.Header>
        <Label.Group>
        <Label size='medium' color='red'> Days <Label.Detail>{days}</Label.Detail></Label>
        <Label size='medium' color='orange'> Hours <Label.Detail>{hours}</Label.Detail></Label>
        <Label size='medium' color='yellow'> Minutes <Label.Detail>{minutes}</Label.Detail></Label>
        </Label.Group>
        <Progress percent={this.state.percent} indicating />

        </Card.Header>

      </React.Fragment>
    )
  }
}

export default Timmer;