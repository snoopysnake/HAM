import React from 'react';
import Item from './Item';
import { storeCatalog } from './StoreCatalog'
import './Store.css';

export default class Store extends React.Component {
  constructor(props) {
    super(props);
    this.purchaseNewVehicle = this.purchaseNewVehicle.bind(this);
    this.removeItem = this.removeItem.bind(this);
  }
  purchaseNewVehicle() {
    this.props.purchaseItem(storeCatalog[this.props.index].nextVehicle);
  }
  removeItem(item) {
    if (this.props.currency >= item.cost && item.unique) {
      item.available = false;
    }
  }
  render() {
    const catalogItems = storeCatalog[this.props.index].upgrades.map((item) => {
      return (
        <Item
          key={ item.name }
          item={ item }
          purchaseItem={ this.props.purchaseItem }
          describeItem={ this.props.describeItem }
          removeItem={ this.removeItem }
        />
      );
    });
    return (
      <div className="component-store">
        <div className="catalog">
          <div className="title">Upgrades</div>
          <div className="current-vehicle">for { storeCatalog[this.props.index].vehicle }</div>
          <div className="upgrades">
            {
              catalogItems
            }
            </div>
            { storeCatalog[this.props.index].nextVehicle &&
              <div>
                <div className="next-vehicle">Next Vehicle:</div>
                  <Item
                    item={ storeCatalog[this.props.index].nextVehicle }
                    purchaseItem={ this.purchaseNewVehicle } 
                    describeItem={ this.props.describeItem }
                    removeItem={ this.removeItem }
                  />
              </div>
            }
        </div>
      </div>
    )
  }
}
