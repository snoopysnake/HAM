import React from 'react';
import './Header.css';

export default class Header extends React.Component{
  render() {
    return (
      <div className="component-header">
        <div className="top">
          <h1>{ Math.floor(this.props.currency) } credits</h1>
        </div>
        <div className="bottom">
          <h1>{ parseFloat(Math.floor(this.props.speed * 100)/100).toFixed(2) } MPH</h1>
          <h1>{ parseFloat(Math.floor(this.props.distance * 100)/100).toFixed(2) } miles</h1>
        </div>
      </div>
    );
  }
}
