import React from 'react';
import './Statistics.css';

var maxSpeed = 0;

export default class Statistics extends React.Component {
  render() {
    const second = Math.floor(this.props.time) % 60;
    const secStr = second === 0 ? '' : second === 1 ? second + ' second' : second + ' seconds'
    const minute = Math.floor(this.props.time / 60 % 60);
    const minStr = minute === 0 ? '' : minute === 1 ? minute + ' minute' : minute + ' minutes'
    const hour = Math.floor(this.props.time / 60 / 60);
    const hrStr = hour === 0 ? '' : hour === 1 ? hour + ' hour' : hour + ' hours'
    const timer = `${hrStr} ${minStr} ${secStr}`;
    return (
      <div className="component-statistics">
        <h1>Stats</h1>
        <Stat name="Time Elapsed" value={ timer } />
        <Stat name="Current Vehicle" value={ this.props.currentVehicle.type } />
        <Stat name="Vehicle Min Speed" value={ this.props.currentVehicle.minSpeed + ' MPH' } />
        <Stat name="Vehicle Max Speed" value={ this.props.currentVehicle.maxSpeed + ' MPH' } />
        <Stat name="Top Speed" value={ this.props.speed > maxSpeed ? (maxSpeed = parseFloat(this.props.speed).toFixed(2)) : maxSpeed + ' MPH' } />
      </div>
    );
  }
}

class Stat extends React.Component {
  render() {
    return (
      <div className="component-stat">
        <div className="label">{ this.props.name }:</div>
        <div className="value">{ this.props.value }</div>
      </div>
    );
  }
}