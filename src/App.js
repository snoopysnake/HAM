import React from 'react';
import './App.css';
import Header from './Header';
import Message from './Message';
import Pixi from './Pixi';
import ProgressBar from './ProgressBar';
import Statistics from './Statistics';
import Vehicle from './Vehicle';
import Store from './Store';

const ticksPerSecond = 60;
const milesToMph = 0.000277778;
var title = '【﻿ＨＡＭ】ＶａｐｏｒＤｒｉｖｅ​​';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.creditMultiplier = 100; // Multiplies by distance traveled in single tick to equal credit earned, default is 100
    this.mphDecay = 1; // MPH lost per second (60 ticks), default is 1 (1 MPH lost/sec)
    this.mphGain = 1; // MPH gained per click, default is 1
    this.clickDelay = 100; // Determines how fast player must click to retain top speed, default is 100 (ms)
    this.speedUp = this.speedUp.bind(this);
    this.purchaseStoreItem = this.purchaseStoreItem.bind(this);
    this.currentVehicle = {
      name: 'Folding Bike',
      cost: 0,
      minSpeed: 5,
      maxSpeed: 10
    };
    this.catalogIndex = 0;
    this.state = {
      speed: 0,
      distance: 0,
      time: 0,
      currency: 0,
    };
  }
  componentDidMount() {
    this.titleTimer = setInterval (
      () => this.shiftTitle(),
      666
    );
    this.tickTimer = setInterval(
      () => this.tick(),
      1000 / ticksPerSecond
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
    // Speed decay
    let newSpeed;
    if (this.atMaxSpeed)
      newSpeed = this.currentVehicle.maxSpeed;
    else newSpeed = Math.max(this.currentVehicle.minSpeed, this.state.speed - (this.mphDecay / ticksPerSecond));
    // Distance traveled
    let newDistance = this.state.distance + ((this.state.speed * milesToMph) / ticksPerSecond);
    let newTime = this.state.time + (1 / ticksPerSecond);
    let newCurrency = this.state.currency + (this.state.speed * milesToMph) / ticksPerSecond * this.creditMultiplier;
    this.setState({
      speed: newSpeed,
      distance: newDistance,
      time: newTime,
      currency: newCurrency
    });
  }
  purchaseStoreItem(storeItem){
    // Check type of item purchased (can be either vehicle or upgrade)
    // Also a convoluted way to get message to fade correctly
    // TODO: make item unavailable (purchased) in store
    // TODO: change color based on success/fail/type of upgrade
    this.fade = false; // If true, sets fade class to message after 1 second
    clearTimeout(this.messageTimer); // Resets timer when clicked
    clearTimeout(this.fadeTimer); // ^^
    if (this.state.currency >= storeItem.cost){
      // Deducts cost, displays message
      this.setState({
        currency: (this.state.currency - storeItem.cost),
        
      });
      this.message = `${storeItem.name} purchased!`
      if (storeItem.minSpeed && storeItem.maxSpeed) {
        // Bought a vehicle
        this.currentVehicle = storeItem;
        this.catalogIndex++;
      }
    } else {
      this.message = `Not enough credits for ${storeItem.name}!`
    }
    this.messageTimer = setTimeout(
      () => {
        this.message = ''
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
  describeStoreItem(storeItem) {
    console.log(storeItem.description)
  }
  speedUp() {
    if (this.state.speed + this.mphGain >= this.currentVehicle.maxSpeed) {
      // Resets max speed timer
      this.atMaxSpeed = true;
      clearTimeout(this.topSpeedTimer);
      this.topSpeedTimer = setTimeout(
        () => this.atMaxSpeed = false,
        this.clickDelay
      );
    }
    this.setState({
      // Add one mph per click
      speed: Math.min(this.currentVehicle.maxSpeed, this.state.speed + this.mphGain)

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
            index = { this.catalogIndex }
            purchaseItem = { this.purchaseStoreItem }
            describeItem={ this.describeStoreItem }
          />
          <Vehicle
            currentVehicle = { this.currentVehicle }
          />
        </div>
      </div>
    );
  }
}
