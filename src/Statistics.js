import React from 'react';
import './Statistics.css';

const ProgressBar = (props) => {
  return(
    <div className="progress-bar">
      <BarFiller percent={props.percent}/>
    </div>
  )
}
const BarFiller = (props) => {
  return <div className="filler" style={{width: `${props.percent}%` }}/>
}

export default class Statistics extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      currentVehicle: {
        type: 'Bicycle',
        minSpeed: 10,
        maxSpeed: 35
      },
      speed: 0,
      distance: 0,
      time: 0,
      ticksPerSecond: 60,
      percent: 0
    };
  }
  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000 / this.state.ticksPerSecond
    );
  }
  componentWillUnmount() {
    clearInterval(this.timerID);
  }
  tick() {
    const milesToMph = 0.000277778;
    // Speed decay
    let speed = Math.max(this.state.currentVehicle.minSpeed, this.state.speed - (1 / this.state.ticksPerSecond));
    // Travel more distance
    let distance = this.state.distance + ((this.state.speed * milesToMph) / this.state.ticksPerSecond);
    let time = this.state.time + (1 / this.state.ticksPerSecond);
    let percent = ((this.state.distance - Math.floor(this.state.distance)) * 100);
    this.setState({
      speed: speed,
      distance: distance,
      time: time,
      percent: percent
    });
  }
  render() {
    return (
      <div className="component-statistics">
        <h1>{ this.state.currentVehicle.type }</h1>
        <h1>Speed: { parseFloat(Math.round(this.state.speed * 100)/100).toFixed(2) } MPH</h1>
        <h2>Distance: { parseFloat(Math.round(this.state.distance * 100)/100).toFixed(2) } Miles</h2>
        <h2>Time: { parseFloat(Math.round(this.state.time * 100) / 100).toFixed(2) }</h2>
        <ProgressBar percent={this.state.percent}/>
      </div>
    );
  }
}
