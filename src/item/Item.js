import React from 'react';
import './Item.css'

export default class Item extends React.Component {
  constructor(props) {
    super(props);
    this.purchaseItem = this.purchaseItem.bind(this);
    this.describeItem = this.describeItem.bind(this);
    this.itemRef = React.createRef();
  }
  purchaseItem() {
    if (this.props.item.available) {
      this.props.purchaseItem(this.props.item);
      this.props.removeItem(this.props.item);
    }
  }
  describeItem() {
    this.props.describeItem(this.props.item, this.itemRef);
  }
  render() {
  	const path = `./assets/${ this.props.item.name.replace(' ','_').toLowerCase() }.png`;
    return (
      <div
        className={
          this.props.item.available ? 'component-item available' :
          !this.props.item.available && this.props.item.cooldown ? 'component-item temp-unavailable' :
          'component-item unavailable'
        }
        onClick={ this.purchaseItem } onMouseEnter={ this.describeItem } onMouseLeave={ e => {this.props.describeItem(null, null)} }
        ref={ this.itemRef }>
        <div className="item-container">
          <img src={ path } alt={ this.props.item.name } />
          <div className="item-cost">{ this.props.item.available || this.props.item.cooldown ? this.props.item.cost : '' }</div>
          <div className={ this.props.item.available || this.props.item.cooldown ? 'item-name' : 'item-name name-unavailable' }>{ this.props.item.name }</div>
          <div className="item-sold">{ this.props.item.available || this.props.item.cooldown ? '' : 'SOLD OUT' }</div>
        </div>
      </div>
    );
  }
}
