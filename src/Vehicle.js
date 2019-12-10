import React from 'react';
import FoldingBike from './FoldingBike';
// import { ReactComponent as FoldingBike} from './svg/folding_bike.svg'; (import SVG without needing to modify DOM)
import './Vehicle.css';

export default class Vehicle extends React.Component {
  render() {
    return (
      <div className="component-vehicle">
      	<div className="vehicle-name">
      		{this.props.currentVehicle.name}
      	</div>
      	<div className="vehicle-container">
					<FoldingBike />
				</div>
      </div>
    );
  }
}
