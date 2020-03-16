import React from 'react';
import './Vehicle.css';

export default class Vehicle extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    console.log(Object.keys(this.props.mods).length)
    console.log(Object.keys(nextProps.mods).length)

    
    return nextProps.mods.length !== this.props.mods.length;
  }
  render() {
    const vehicle = React.cloneElement(this.props.currentVehicle.SVG, this.props.mods ); // Adds mods array to vehicle's svg component
    return (
      <div className="component-vehicle">
      	<div className="vehicle-name">
      		{this.props.currentVehicle.name}
      	</div>
        { vehicle }
      </div>
    );
  }
}
