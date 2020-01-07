import React from 'react';
import './App.css';
import Header from './Header';
import Message from './Message';
import Pixi from './Pixi';
import ProgressBar from './ProgressBar';
import Statistics from './Statistics';
import Vehicle from './Vehicle';
import Store from './Store';
import Modifier from './Modifier';

// const ticksPerSecond = 60; // Defunct now that we use elapsed time
const milesToMph = 0.000277778;
var title = '【﻿ＨＡＭ】ＶａｐｏｒＤｒｉｖｅ​​';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.currentTime = new Date();
    this.creditMultiplier = 100; // Multiplies by distance traveled in single tick to equal credit earned, default is 100
    this.mphDecay = 1; // MPH lost per second (60 ticks), default is 1 (1 MPH lost/sec)
    this.mphGain = 1; // MPH gained per click, default is 1
    this.clickDelay = 100; // Determines how fast player must click to retain top speed, default is 100 (ms)
    this.index = 0; // index of store catalog
    this.activeUpgrades = []; // Array of active upgrade timeouts (empty this array when purchasing new vehicle)
    this.currentVehicle = {
      name: 'Folding Bike',
      cost: 0,
      minSpeed: 5,
      maxSpeed: new Modifier(10, 1, 1, 0)
    };
    this.state = {
      speed: 0,
      distance: 0,
      time: 0,
      currency: 1000,
    };
    this.speedUp = this.speedUp.bind(this);
    this.purchaseItem = this.purchaseItem.bind(this);
  }
  componentDidMount() {
    this.titleTimer = setInterval (
      () => this.shiftTitle(),
      666
    );
    this.tickTimer = setInterval(
      () => this.tick(),
      1000 / 60
    );
  }
  componentWillUnmount() {
    clearInterval(this.tickTimer);
    clearInterval(this.titleTimer);
  }
  shiftTitle() {
    title = title.substring(1, title.length) + title.charAt(0);
    document.title = title;
  }
  tick() {
    // Compare time to last time
    var previousTime = this.currentTime;
    this.currentTime = new Date();
    var elapsedSeconds = (this.currentTime - previousTime) / 1000;

    // Speed decay
    let newSpeed;
    if (this.atMaxSpeed) {
      if (this.state.speed > this.currentVehicle.maxSpeed.total()) {
        // speed can be greater than max speed if a modifier is active
        newSpeed = this.state.speed - (this.mphDecay * elapsedSeconds);
      }
      else newSpeed = this.currentVehicle.maxSpeed.total();
    }
    else newSpeed = Math.max(this.currentVehicle.minSpeed, this.state.speed - (this.mphDecay * elapsedSeconds));

    // Distance traveled
    let newDistance = this.state.distance + ((this.state.speed * milesToMph) * elapsedSeconds);
    let newTime = this.state.time + elapsedSeconds;
    let newCurrency = this.state.currency + ((this.state.speed * milesToMph) * elapsedSeconds) * this.creditMultiplier;
    this.setState({
      speed: newSpeed,
      distance: newDistance,
      time: newTime,
      currency: newCurrency
    });
  }
  purchaseItem(item){
    // Check type of item purchased (can be either vehicle or upgrade)
    // TODO: change color based on success/fail/type of upgrade
    if (this.state.currency >= item.cost){
      // Deducts cost, displays message
      this.setState({
        currency: (this.state.currency - item.cost),
      });
      this.message = `${item.name} purchased!`
      console.log(this.message);
      // Modify stats
      if (item.modify) {
        const itemModify = item.modify.bind(this);
        itemModify(this);
      }
      // Bought a vehicle (only vehicles have minSpeed and maxSpeed properties)
      if (item.minSpeed && item.maxSpeed) {
        // Remove active upgrades
        this.currentVehicle = item;
        this.index++;
      }
    } else {
      this.message = `Not enough credits for ${item.name}!`
    }
    this.fadeMessage();
  }
  fadeMessage() {
    // A convoluted way to get message to fade correctly
    this.fade = false; // If true, sets fade class to message after 1 second
    clearTimeout(this.messageTimer); // Resets timer when clicked
    clearTimeout(this.fadeTimer); // ^^
    this.messageTimer = setTimeout(
      () => {
        this.message = '' // Clears message after 2 sec
        this.fade = false;
      },
      2000
    );
    this.fadeTimer = setTimeout(
      () => {
        this.fade = true;
      },
      1000
    );
  }
  speedUp() {
    if (this.state.speed + this.mphGain >= this.currentVehicle.maxSpeed.total()) {
      // Resets max speed timer
      this.atMaxSpeed = true;
      clearTimeout(this.topSpeedTimer);
      this.topSpeedTimer = setTimeout(
        () => this.atMaxSpeed = false,
        this.clickDelay
      );
    }
    if (this.state.speed <= this.currentVehicle.maxSpeed.total()) {
      // speed can be greater than max speed if a modifier is active
      this.setState({
        // Add one mph per click
        speed: Math.min(this.currentVehicle.maxSpeed.total(), this.state.speed + this.mphGain)
      });
    }
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
        <Message message={ this.message } fade={ this.fade } />
        <ProgressBar percent={ (this.state.distance - Math.floor(this.state.distance)) * 100 } />
        <div className="menu">
          <Statistics
            currentVehicle = { this.currentVehicle }
            speed = { this.state.speed }
            distance = { this.state.distance }
            time = { this.state.time }
          />
          <Store
            index = { this.index }
            purchaseItem = { this.purchaseItem }
            currency = { this.state.currency }
          />
          <Vehicle
            currentVehicle = { this.currentVehicle }
          />
        </div>
      </div>
    );
  }
}
