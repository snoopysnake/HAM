import React from 'react';

export default class PlayerFrame extends React.Component{
  state = {
    currentVehicle: 'Bicycle',
    speed: 0,
    distance: 0,
    time: 0
  };
  render() {
    return (
      <div>
        <h1>{ this.state.currentVehicle }</h1>
        <h1>Speed: { parseFloat(Math.round(this.state.speed * 100)/100).toFixed(2) } MPH</h1>
        <h2>Distance: { parseFloat(Math.round(this.state.distance * 100)/100).toFixed(2) } Miles</h2>
        <h2>Time: { parseFloat(Math.round(this.state.time * 100) / 100).toFixed(2) }</h2>
      </div>
    );
  }
}


