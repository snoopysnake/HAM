import React from 'react';
import './App.css';
import Header from './Header';
import Pixi from './Pixi';
import ProgressBar from './ProgressBar';
import Statistics from './Statistics';
import Vehicle from './Vehicle';
import Store from './Store';

const ticksPerSecond = 60;
const milesToMph = 0.000277778;
const multiplier = 100;

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.speedUp = this.speedUp.bind(this);
    this.state = {
      currentVehicle: {
        type: 'Bicycle',
        minSpeed: 10,
        maxSpeed: 35
      },
      speed: 0,
      distance: 0,
      time: 0,
      currency: 0
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
    let newSpeed = Math.max(this.state.currentVehicle.minSpeed, this.state.speed - (1 / ticksPerSecond));
    // Distance traveled
    let newDistance = this.state.distance + ((this.state.speed * milesToMph) / ticksPerSecond);
    let newTime = this.state.time + (1 / ticksPerSecond);
    let newCurrency = Math.round(newDistance * multiplier);
    this.setState({
      speed: newSpeed,
      distance: newDistance,
      time: newTime,
      currency: newCurrency
    });
  }
  speedUp() {
    this.setState({
      // Add one mph
      speed: Math.min(this.state.currentVehicle.maxSpeed, this.state.speed + 1)
    });
  }
  render() {
    return (
      <div className="component-app">
        <div className="view" onClick={ this.speedUp }>
          <Header
            speed = { this.state.speed }
            distance = { this.state.distance }
            currency = { this.state.currency }
          />
          <Pixi />
        </div>
        <ProgressBar percent={ (this.state.distance - Math.floor(this.state.distance)) * 100 } />
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
            currency = { this.state.currency }
          />
        </div>
      </div>
    );
  }
}
