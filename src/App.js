import React from 'react';
import Header from './Header';
import ActiveBuffs from './ActiveBuffs';
import Message from './Message';
import Pixi from './Pixi';
import ProgressBar from './ProgressBar';
import Statistics from './Statistics';
import Vehicle from './Vehicle';
import FoldingBike from './FoldingBike';
import Store from './Store';
import Modifier from './Modifier';
import './App.css';

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
    this.currentVehicle = {
      name: 'Folding Bike',
      cost: 0,
      minSpeed: 3,
      maxSpeed: new Modifier(10, 1, 1, 0),
      SVG: <FoldingBike />
    };
    this.state = {
      speed: 0,
      distance: 0,
      time: 0,
      currency: 1000,
      activeBuffs: [], // Array of active upgrade timeouts (empty this array when purchasing new vehicle),
      mods: {}, // empty object for storing SVG Components
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
    if (this.state.currency >= item.cost) {
      // Deducts cost, displays message
      this.setState({
        currency: (this.state.currency - item.cost),
      });
      let message = `${item.name} purchased!`
      this.setState({message: message});
      console.log(message);
      // Modify stats
      if (item.modify) {
        const itemModify = item.modify.bind(this);
        itemModify(item);
      }
      // Gear is added to active buffs but is not removed
      if (item.isGear) {
        this.setState({
          activeBuffs: [...this.state.activeBuffs, item], // Add gear
        });
      }
      // Add SVG to Vehicles Component
      else if (item.isMod) {
        // camelCase mod properties 
        let modName = item.name.replace(' ','');
        modName = modName.charAt(0).toLowerCase() + modName.slice(1);
        this.setState(state => ({
          mods: {                   // object that we want to update
            ...state.mods,    // keep all other key-value pairs
            [modName]: item.SVG       // update the value of specific key
          }
        }));
      }
      // Remove stats after a timeout
      else if (item.cooldown && item.remove) {
        const itemRemove = item.remove.bind(this);
        item.timeout = setTimeout(() => {
          itemRemove(item);
          this.setState({
            activeBuffs: this.state.activeBuffs.filter(buff => {
              return buff.name !== item.name; 
            }),
          });
        }, item.active);
        this.setState({
          activeBuffs: [...this.state.activeBuffs, item], // Add buff
        });
      }
      // Bought a vehicle (only vehicles have minSpeed and maxSpeed properties)
      else if (item.minSpeed && item.maxSpeed) {
        // Remove all active upgrades and mods
        this.setState({
          activeBuffs: this.state.activeBuffs.filter(buff => {
            if (buff.remove) {
              const buffRemove = buff.remove.bind(this);
              buffRemove(buff);
              clearTimeout(buff.timeout);
              return false;
            }
            return true;
          }),
        });
        this.setState({mods: {}});
        this.currentVehicle = item;
        this.index++;
      }
    } else {
      this.setState({message: `Not enough credits for ${item.name}!`});
    }
    this.fadeMessage();
  }
  fadeMessage() {
    // A convoluted way to get message to fade correctly
    this.setState({fadeMessage: false}); // If true, sets fade class to message after 1 second
    clearTimeout(this.messageTimer); // Resets timer when clicked
    clearTimeout(this.fadeTimer); // ^^
    this.messageTimer = setTimeout(
      () => {
        this.setState({message: '', fadeMessage: false}); // Clears message after 2 sec
      },
      2000
    );
    this.fadeTimer = setTimeout(
      () => {
        this.setState({fadeMessage: true});
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
        <div className="left-sidebar">
          <Statistics
            currentVehicle = { this.currentVehicle }
            speed = { this.state.speed }
            distance = { this.state.distance }
            time = { this.state.time }
          />
        </div>
        <div className="view" onClick={ this.speedUp }>
          <Message message={ this.state.message } fade={ this.state.fadeMessage } />
          <ActiveBuffs activeBuffs={ this.state.activeBuffs }/>
          <Header
            speed = { this.state.speed }
            distance = { this.state.distance }
            currency = { this.state.currency }
          />
          <Pixi
            speed = { this.state.speed }
            currentVehicle = { this.currentVehicle }
          />
          <ProgressBar percent={ (this.state.distance - Math.floor(this.state.distance)) * 100 } />
        </div>
        <div className="right-sidebar">
          <Store
            index = { this.index }
            purchaseItem = { this.purchaseItem }
            currency = { this.state.currency }
          />
          <Vehicle
            currentVehicle = { this.currentVehicle }
            mods = { this.state.mods }
          />
        </div>
      </div>
    );
  }
}