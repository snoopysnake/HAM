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

var title = '【﻿ＨＡＭ】ＶａｐｏｒＤｒｉｖｅ​​';
var creditMultiplier = 100; // Multiplies by distance traveled in single tick to equal credit earned, default is 100
var mphDecay = 1; // MPH lost per second (60 ticks), default is 1 (1 MPH lost/sec)
var mphGain = 1; // MPH gained per click, default is 1
var clickDelay = 100; // Determines how fast player must click to retain top speed, default is 100 (ms)
var atMaxSpeed = false;

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.speedUp = this.speedUp.bind(this);
    this.purchaseStoreItem = this.purchaseStoreItem.bind(this);
    this.state = {
      currentVehicle: {
        name: 'Folding Bike',
        cost: 0,
        minSpeed: 5,
        maxSpeed: 10
      },
      speed: 0,
      distance: 0,
      time: 0,
      currency: 0,
      catalogIndex: 0,
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
  }
  shiftTitle() {
    title = title.substring(1, title.length) + title.charAt(0);
    document.title = title;
  }
  tick() {
    // Speed decay
    let newSpeed;
    if (atMaxSpeed)
      newSpeed = this.state.currentVehicle.maxSpeed;
    else newSpeed = Math.max(this.state.currentVehicle.minSpeed, this.state.speed - (mphDecay / ticksPerSecond));
    // Distance traveled
    let newDistance = this.state.distance + ((this.state.speed * milesToMph) / ticksPerSecond);
    let newTime = this.state.time + (1 / ticksPerSecond);
    let newCurrency = this.state.currency + (this.state.speed * milesToMph) / ticksPerSecond * creditMultiplier;
    this.setState({
      speed: newSpeed,
      distance: newDistance,
      time: newTime,
      currency: newCurrency
    });
  }
  purchaseStoreItem(storeItem){
    // Must check type of item purchased (can be either vehicle or upgrade)
    // TODO: make item unavailable (purchased) in store
    // TODO: remove alerts, make popup top of window
    if (this.state.currency >= storeItem.cost){
      alert(storeItem.name + ' purchased!');
      this.setState({
        currency: (this.state.currency - storeItem.cost)
      });
      if (storeItem.minSpeed && storeItem.maxSpeed) {
        // Bought a vehicle
        let i = this.state.catalogIndex;
        this.setState({
          currentVehicle: storeItem,
          catalogIndex: i+1,
        });

      }
    } else {
      alert(`Not enough credits for ${storeItem.name}!`);
    }
  }
  speedUp() {
    if (this.state.speed + mphGain >= this.state.currentVehicle.maxSpeed) {
      // Resets max speed timer
      atMaxSpeed = true;
      clearTimeout(this.topSpeedTimer);
      this.topSpeedTimer = setTimeout(
        () => {
          atMaxSpeed = false;
        },
        clickDelay
      );
    }
    this.setState({
      // Add one mph per click
      speed: Math.min(this.state.currentVehicle.maxSpeed, this.state.speed + mphGain)

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
            index = { this.state.catalogIndex }
            purchaseItem = { this.purchaseStoreItem }
          />
        </div>
      </div>
    );
  }
}
