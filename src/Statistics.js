import React from 'react';
import './Statistics.css';

var maxSpeed = 0;

export default class Statistics extends React.Component{
  render() {
    return (
      <div className="component-statistics">
        <h1>Stats</h1>
        <h2>Speed: { parseFloat(Math.round(this.props.speed * 100)/100).toFixed(2) } MPH</h2>
        <h2>Distance: { parseFloat(Math.round(this.props.distance * 100)/100).toFixed(2) } miles</h2>
        <h3>Current Vehicle: { this.props.currentVehicle.type }</h3>
        <h3>Time Elapsed: { parseFloat(Math.round(this.props.time * 100) / 100).toFixed(2) }</h3>
        <h3>Max Speed: { this.props.speed > maxSpeed ? (maxSpeed = this.props.speed) : maxSpeed } MPH</h3>
      </div>
    );
  }
}
