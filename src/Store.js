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
    this.state = { description: null, modifier: null, display: 0 };
  }
  purchaseNewVehicle() {
    this.props.purchaseItem(storeCatalog[this.props.index].nextVehicle);
  }
  removeItem(item) {
    // Prevents further purchase, change CSS
    if (this.props.currency >= item.cost) {
      item.available = false;
      if (item.cooldown) {
        setTimeout(() => {
          item.available = true;
        }, item.cooldown);
      }
      if (item.isGear) {
        // Removes every subsequent reference to gear object in upgrade arrays
        var i = this.props.index + 1;
        while (storeCatalog[i].upgrades.indexOf(item) >= 0) {
          storeCatalog[i].upgrades.splice(item, 1);
          i++;
        }
      }
    }
  }
  describeItem(item, itemRef) {
    if (item) {
      this.itemRef = itemRef;
      // set item description in tooltip
      if (item.description) {
        this.setState({
          description: `"${item.description}"`
        });
      }
      else {
        this.setState({
          description: '<No description>'
        });
      }
      // set item modifier in tooltip
      if (item.modifier) {
        this.setState({
          modifier: item.modifier
        });
      }
      else {
        this.setState({
          modifier: '<No modifier>'
        });
      }
    }
    else {
      this.itemRef = null;
      this.setState({
        description: null,
        modifier: null,
        display: 0
      });
    }
  }
  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.currency < this.props.currency ||
      nextState.description !== this.state.description || nextState.modifier !== this.state.modifier ||
      nextState.display !== this.state.display;
  }
  componentDidUpdate() {
    if (this.state.description && this.state.modifier && this.state.display === 0) {
      this.descX = this.itemRef.current.getBoundingClientRect().x - 75;
      this.descY = this.itemRef.current.getBoundingClientRect().y - this.tooltipRef.current.clientHeight - 5;
      this.setState({display: 1});
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
        <div className="tooltip" style={ this.state.description ? { left:this.descX, top:this.descY, opacity:this.state.display } : { display: 'none' } } ref={ this.tooltipRef }>
          <span>{ this.state.description }</span>
          <span className="modifier">{ this.state.modifier }</span>
        </div>
      </div>
    )
  }
}
