import React from 'react';
import './App.css';
import Pixi from './Pixi';
import Statistics from './Statistics';
import Vehicle from './Vehicle';
import Store from './Store';

const ticksPerSecond = 60;
const milesToMph = 0.000277778;

export default class App extends React.Component {
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
      time: 0
    };
  }
  componentDidMount() {
    this.timer = setInterval(
      () => this.tick(),
      1000 / ticksPerSecond
    );
  }
  componentWillUnmount() {
    clearInterval(this.timer);
  }
  tick() {
    // Speed decay
    let speed = Math.max(this.state.currentVehicle.minSpeed, this.state.speed - (1 / ticksPerSecond));
    // Travel more distance
    let distance = this.state.distance + ((this.state.speed * milesToMph) / ticksPerSecond);
    let time = this.state.time + (1 / ticksPerSecond);
    this.setState({
      speed: speed,
      distance: distance,
      time: time
    });
  }
  render() {
    return (
      <div className="component-app">
        <Pixi />
        <div className="menu">
          <Statistics
            currentVehicle = { this.state.currentVehicle }
            speed = { this.state.speed }
            distance = { this.state.distance }
            time = { this.state.time }
          />
          <Vehicle
            currentVehicle = { this.state.currentVehicle }
          />
          <Store
            distance = { this.state.distance }
          />
        </div>
      </div>
    );
  }
}
