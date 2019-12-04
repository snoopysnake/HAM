import React from 'react';
import './Item.css'

export default class Item extends React.Component {
  purchaseItem(){
    // this.props.purchaseItem
    this.props.purchaseItem(this.props.item);
  }
  render() {
    let cost, speed;
    if(this.props.item.cost != undefined){
      cost = <div>{ this.props.item.cost } credits</div>;
    }
    if(this.props.item.minSpeed != undefined && this.props.item.maxSpeed != undefined){
      speed = <div>{ this.props.item.minSpeed }-{ this.props.item.maxSpeed } MPH</div>;
    }
    return (
      <div className="component-item" onClick={this.purchaseItem.bind(this)}>
        <h4>{ this.props.item.name }</h4>
        {cost}
        {speed}
      </div>
    );
  }
}
