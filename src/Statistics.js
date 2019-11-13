import React from 'react';
import './Statistics.css';

var maxSpeed = 0;

export default class Statistics extends React.Component{
  render() {
    return (
      <div className="component-statistics">
        <h1>Stats</h1>
        <h3>Time Elapsed: { Math.floor(this.props.time) }</h3>
        <h3>Current Vehicle: { this.props.currentVehicle.type }</h3>
        <h3>Vehicle Min Speed: { this.props.currentVehicle.minSpeed } MPH</h3>
        <h3>Vehicle Max Speed: { this.props.currentVehicle.maxSpeed } MPH</h3>
        <h3>All-Time Max Speed: { this.props.speed > maxSpeed ? (maxSpeed = parseFloat(this.props.speed).toFixed(2)) : maxSpeed } MPH</h3>
      </div>
    );
  }
}
