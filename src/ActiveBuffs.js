import React from 'react';
import './ActiveBuffs.css';

export default class ActiveBuffs extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.activeBuffs.length !== this.props.activeBuffs.length;
  }
  render() {
    console.log('ActiveBuffs.js rendered')
    const activeBuffs = this.props.activeBuffs.map((buff) => {
      return (
        <Buff
          key={ buff.name }
          name={ buff.name }
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
    const path = `./assets/${ this.props.name.replace(' ','_').toLowerCase() }.png`;
    return (
      <div className="component-buff">
        <img src={ path } alt={ this.props.name } />
      </div>
    );
  }
}