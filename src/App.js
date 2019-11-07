import React from 'react';
import './App.css';
import PlayerFrame from './PlayerFrame';

export default class App extends React.Component {
  render() {
    return (
      <div className="component-app">
        <PlayerFrame />
      </div>
    );
  }
}
