import React from 'react';
import Item from './Item';
import { storeCatalog } from './StoreCatalog'
import './Store.css';

export default class Store extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      catalogIndex: 0,
    }
  }
  render() {
    const catalogItems = storeCatalog[this.state.catalogIndex].upgrades.map((item) => {
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
        <h1>Upgrades</h1>
        {
          catalogRows
        }
        <div>
          <div className="next-vehicle">Next Vehicle:</div>
          <Item item={ storeCatalog[this.state.catalogIndex].nextVehicle } purchaseItem={ this.props.purchaseItem } />
        </div>
      </div>
    )
  }
}
