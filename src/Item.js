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
      <div className={ this.props.item.available ? 'component-item available' : 'component-item unavailable' }
        onClick={ this.purchaseItem } onMouseEnter={ this.describeItem } onMouseLeave={ e => {this.props.describeItem(null, null)} }
        ref={ this.itemRef }>
        <div className="item-container">
          <img src={ path } alt={ this.props.item.name } />
          <div className="item-cost">{ this.props.item.available ? this.props.item.cost : '' }</div>
          <div className="item-name">{ this.props.item.available ? this.props.item.name : 'SOLD OUT' }</div>
        </div>
      </div>
    );
  }
}
