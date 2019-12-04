import React from 'react';
import './Item.css'

export default class Item extends React.Component {
  purchaseItem(){
    // this.props.purchaseItem
    this.props.purchaseItem(this.props.item);
  }
  render() {
    return (
      <div className="component-item" onClick={this.purchaseItem.bind(this)}>
        <h4>{ this.props.item.name }</h4>
        <div>{ this.props.item.cost } credits</div>
        <div>{ this.props.item.minSpeed }-{ this.props.item.maxSpeed } MPH</div>
      </div>
    );
  }
}
