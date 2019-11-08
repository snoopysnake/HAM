import React from 'react';
import './App.css';
import Menu from './Menu';
import Pixi from './Pixi';

export default class App extends React.Component {
  render() {
    return (
      <div className="component-app">
        <Pixi />
        <Menu />
      </div>
    );
  }
}
