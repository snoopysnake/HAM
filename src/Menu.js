import React from 'react';
import Statistics from './Statistics';
import Vehicle from './Vehicle';
import Store from './Store';
import './Menu.css';

export default class Menu extends React.Component {
  render() {
    return (
      <div className="component-menu">
        <Statistics />
        <Vehicle />
        <Store />
      </div>
    );
  }
}
