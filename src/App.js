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

var title = '【﻿ＨＡＭ】ＶａｐｏｒＤｒｉｖｅ​​';
var atMaxSpeed = false;

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.speedUp = this.speedUp.bind(this);
    this.purchaseStoreItem = this.purchaseStoreItem.bind(this);
    this.state = {
      currentVehicle: {
        name: 'Bicycle',
        minSpeed: 8,
        maxSpeed: 20
      },
      ownedVehicles: [],
      speed: 0,
      distance: 0,
      time: 0,
      currency: 0
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
    // console.log(title);
    title = title.substring(1, title.length) + title.charAt(0);
    document.title = title;
  }
  tick() {
    // Speed decay
    let newSpeed;
    if (atMaxSpeed)
      newSpeed = this.state.currentVehicle.maxSpeed;
    else newSpeed = Math.max(this.state.currentVehicle.minSpeed, this.state.speed - (1 / ticksPerSecond));
    // Distance traveled
    let newDistance = this.state.distance + ((this.state.speed * milesToMph) / ticksPerSecond);
    let newTime = this.state.time + (1 / ticksPerSecond);
    let newCurrency = this.state.currency + (this.state.speed * milesToMph) / ticksPerSecond * multiplier;
    this.setState({
      speed: newSpeed,
      distance: newDistance,
      time: newTime,
      currency: newCurrency
    });
  }
  purchaseStoreItem(storeItem){
    if(this.state.ownedVehicles.includes(storeItem.name)){
      alert("You already own a "+storeItem.name+"!");
    } else if(storeItem.cost > this.state.currency){
      alert("Not enough credits for "+storeItem.name+".\n\n"+
            "Your credits: "+Math.round(this.state.currency)+"\n"+
            storeItem.name+" price: "+storeItem.cost);
    } else {
      alert(storeItem.name + " purchased!");
      this.setState({
        currentVehicle: storeItem,
        currency: (this.state.currency - storeItem.cost)
      });
      this.state.ownedVehicles.push(storeItem.name);
    }
  }
  speedUp() {
    if (this.state.speed + 1 >= this.state.currentVehicle.maxSpeed) {
      // Resets max speed timer
      atMaxSpeed = true;
      clearTimeout(this.topSpeedTimer);
      this.topSpeedTimer = setTimeout(
        () => {
          atMaxSpeed = false;
        },
        200
      );
    }
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
            purchaseItem = {this.purchaseStoreItem }
          />
        </div>
      </div>
    );
  }
}
