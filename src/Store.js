import React from 'react';
import Item from './Item';
import { storeCatalog } from './StoreCatalog'
import './Store.css';

export default class Store extends React.Component {
  constructor(props) {
    super(props);
    this.purchaseNewVehicle = this.purchaseNewVehicle.bind(this);
  }
  purchaseNewVehicle() {
    this.props.purchaseItem(storeCatalog[this.props.index].nextVehicle);
  }
  render() {
    console.log(this.props)
    const catalogItems = storeCatalog[this.props.index].upgrades.map((item) => {
      return <Item  key={ item.name } item={ item } purchaseItem={ this.props.purchaseItem } />
    });
    const catalogRows = [];
    for (let i = 0; i < catalogItems.length; i+=3) {
      catalogRows.push(
        <div key={`row-${i}`} className="row">
          { catalogItems[i] }
          { catalogItems[i + 1] }
          { catalogItems[i + 2] }
        </div>
      );
    }
    return (
      <div className="component-store">
        <div className="title">Upgrades</div>
        <div className="current-vehicle">for { storeCatalog[this.props.index].vehicle }</div>
        <div className="catalog">
          {
            catalogItems
          }
        </div>
        { storeCatalog[this.props.index].nextVehicle &&
          <div>
            <div className="next-vehicle">Next Vehicle:</div>
              <Item item={ storeCatalog[this.props.index].nextVehicle } purchaseItem={ this.purchaseNewVehicle } />
          </div>
        }
      </div>
    )
  }
}
