import React from 'react';
import './Item.css'

export default class Item extends React.Component {
  render() {
    return (
      <div className="component-item">
        { this.props.item.name }
      </div>
    );
  }
}