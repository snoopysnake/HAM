import React from 'react';
import './Statistics.css';

var maxSpeed = 0;

export default class Statistics extends React.Component{
  render() {
    return (
      <div className="component-statistics">
        <h1>Stats</h1>
        <h3>Current Vehicle: { this.props.currentVehicle.type }</h3>
        <h3>Time Elapsed: { parseFloat(Math.round(this.props.time * 100) / 100).toFixed(2) }</h3>
        <h3>Max Speed: { this.props.speed > maxSpeed ? (maxSpeed = parseFloat(this.props.speed).toFixed(2)) : maxSpeed } MPH</h3>
      </div>
    );
  }
}
