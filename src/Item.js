import React from 'react';
import './Item.css'

export default class Item extends React.Component {
  constructor(props) {
    super(props);
    this.purchaseItem = this.purchaseItem.bind(this);
    this.describeItem = this.describeItem.bind(this);
    this.cost = this.props.item.cost;
    this.name = this.props.item.name;
  }
  purchaseItem() {
    this.props.purchaseItem(this.props.item);
    this.props.removeItem(this.props.item);
    if (!this.props.item.available) {
      this.cost = '';
      this.name = 'SOLD OUT';
    }
  }
  describeItem() {
    this.props.describeItem(this.props.item);
  }
  render() {
  	const path = `./assets/${ this.props.item.name.replace(' ','_').toLowerCase() }.png`;
    return (
      <div className="component-item">
        <div className="item" onClick={ this.purchaseItem } onMouseEnter={ this.describeItem }>
        	<img src={ path } alt={ this.props.item.name } />
        	<div className="item-cost">{ this.cost }</div>
          <div className="item-name">{ this.name }</div>
        </div>
      </div>
    );
  }
}
