import React from 'react';
import './Vehicle.css';

export default class Vehicle extends React.Component {
  render() {
    return (
      <div className="component-vehicle">
      	{this.props.currentVehicle.name}
      </div>
    );
  }
}
