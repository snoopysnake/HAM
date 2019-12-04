import React from 'react';
import './Item.css'

export default class Item extends React.Component {
  render() {
  	const path = `/assets/${ this.props.item.name.replace(' ','_') }.png`;
    return (
      <div className="component-item">
      	<img src={ path } alt={ this.props.item.name } />
        <div className="item-name">{ this.props.item.name }</div>
      </div>
    );
  }
}