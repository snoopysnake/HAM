import React from 'react';
import * as PIXI from 'pixi.js'
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

let title = '【﻿ＨＡＭ】ＶａｐｏｒＤｒｉｖｅ​​';
const milesToMph = 0.000277778;
const app = new PIXI.Application({
  backgroundColor: '0xe8a856',
});
let pixiSprites = {}; 
app.loader
.add('girl', './assets/girl_side.png')
.load(onAssetsLoaded);

function onAssetsLoaded(loader, res) {
  const parent = app.view.parentNode;
  const girl = new PIXI.Sprite(res.girl.texture);
  app.stage.addChild(girl);
  pixiSprites.girl = girl;
  girl.scale = new PIXI.Point(parent.clientHeight/960, parent.clientHeight/960);
  girl.x = 0;
  girl.y = parent.clientHeight - girl.height;
}

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.currentTime = new Date();
    this.creditMultiplier = 100; // Multiplies by distance traveled in single tick to equal credit earned, default is 100
    this.mphDecay = -1; // MPH lost per second (60 ticks), default is 1 (1 MPH lost/sec)
    this.mphGain = 4; // MPH gained per click, default is 1
    this.mphDifference = this.mphDecay;
    this.mphDifferenceTimer = null;
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
    // Move sprite on click
    app.loader.onComplete.add(() => {
      let ticker = PIXI.Ticker.shared;
      ticker.start();
      ticker.add(time => {
        pixiSprites.girl.x = this.state.speed < this.currentVehicle.maxSpeed.total() ? (this.state.speed - this.currentVehicle.minSpeed) / (this.currentVehicle.maxSpeed.total()
          - this.currentVehicle.minSpeed) * (app.view.parentNode.clientWidth - pixiSprites.girl.width) : app.view.parentNode.clientWidth - pixiSprites.girl.width;
      });  
    });    
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
    let previousTime = this.currentTime;
    this.currentTime = new Date();
    let elapsedSeconds = (this.currentTime - previousTime) / 1000;

    // Speed gain or decay
    let newSpeed;
    if (this.state.speed + (this.mphDifference * elapsedSeconds) > this.currentVehicle.maxSpeed.total()) {
      newSpeed = this.currentVehicle.maxSpeed.total();
    }
    else newSpeed = Math.max(this.currentVehicle.minSpeed, this.state.speed + (this.mphDifference * elapsedSeconds));

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
          mods: {
            ...state.mods,
            [modName]: item.SVG
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
    // speed can be greater than max speed if a modifier is active
    this.mphDifference = this.mphGain;
    clearTimeout(this.mphDifferenceTimer); // Reset timer for speed decay
    this.mphDifferenceTimer = setTimeout(() => {
      this.mphDifference = this.mphDecay;
    }, 200);
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
            app = { app }
            sprites = { pixiSprites }
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