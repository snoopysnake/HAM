import React from 'react';
import './ActiveUpgrades.css';

export default class ActiveUpgrades extends React.Component {
  render() {
    const upgrades = this.props.activeUpgrades.map((upgrade) => {
      return (
        <Upgrade
          key={ upgrade.name }
          upgrade={ upgrade }
        />
      );
    });
    return (
      <div className="component-active-upgrades">
        { upgrades }
      </div>
    );
  }
}

class Upgrade extends React.Component {
  render() {
    const path = `./assets/${ this.props.upgrade.name.replace(' ','_').toLowerCase() }.png`;
    return (
      <div className="component-upgrade">
        <img src={ path } alt={ this.props.upgrade.name } />
      </div>
    );
  }
}