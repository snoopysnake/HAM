import React from 'react';
import './ActiveBuffs.css';

export default class ActiveBuffs extends React.Component {
  render() {
    const activeBuffs = this.props.activeBuffs.map((buff) => {
      return (
        <Buff
          key={ buff.name }
          buff={ buff }
        />
      );
    });
    return (
      <div className="component-active-buffs">
        { activeBuffs }
      </div>
    );
  }
}

class Buff extends React.Component {
  render() {
    const path = `./assets/${ this.props.buff.name.replace(' ','_').toLowerCase() }.png`;
    return (
      <div className="component-buff">
        <img src={ path } alt={ this.props.buff.name } />
      </div>
    );
  }
}