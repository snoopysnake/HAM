import React from 'react';
import './App.css';
import Statistics from './Statistics';
import Pixi from './Pixi';

export default class App extends React.Component {
  render() {
    return (
      <div className="component-app">
        <Statistics />
        <Pixi />
      </div>
    );
  }
}
