import React from 'react';
import Item from './Item';
import { storeCatalog } from './StoreCatalog'
import './Store.css';

export default class Store extends React.Component {
  constructor(props) {
    super(props);
    this.purchaseNewVehicle = this.purchaseNewVehicle.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.describeItem = this.describeItem.bind(this);
    this.tooltipRef = React.createRef();
    this.itemRef = null; // Used to get position of item hovered over
    this.state = { description: null };
  }
  purchaseNewVehicle() {
    this.props.purchaseItem(storeCatalog[this.props.index].nextVehicle);
  }
  removeItem(item) {
    // Prevents further purchase, change CSS
    if (this.props.currency >= item.cost && item.unique) {
      item.available = false;
    }
  }
  describeItem(item, itemRef) {
    if (item) {
      this.itemRef = itemRef;
      if (item.description) {
        this.setState({
          description: item.description
        });
      }
      else {
        this.setState({
          description: '<No description>'
        });
      }
    }
    else {
      this.itemRef = null;
      this.setState({
        description: null
      });
    }
  }
  componentDidUpdate() {
    if (this.state.description) {
      this.descX = this.itemRef.current.getBoundingClientRect().x - 50;
      this.descY = this.itemRef.current.getBoundingClientRect().y - this.tooltipRef.current.clientHeight - 5;
    }
  }
  render() {
    const catalogItems = storeCatalog[this.props.index].upgrades.map((item) => {
      return (
        <Item
          key={ item.name }
          item={ item }
          purchaseItem={ this.props.purchaseItem }
          describeItem={ this.describeItem }
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
                  describeItem={ this.describeItem }
                  removeItem={ this.removeItem }
                />
            </div>
          }
        </div>
        <div className="tooltip" style={ this.state.description ? { left:this.descX, top:this.descY } : { opacity: '0', visibility: 'hidden' } } ref={ this.tooltipRef }>
          { this.state.description }
        </div>
      </div>
    )
  }
}
