import React from 'react';
import Item from './Item';
import { storeCatalog } from './StoreCatalog'
import './Store.css';

export default class Store extends React.Component {
  constructor(props) {
    super(props);
    this.switchTab = this.switchTab.bind(this);
    this.state = {
      activeTab: 'Vehicles'
    }
  }
  switchTab(e) {
    this.setState({
      activeTab: e.target.innerText
    });
  }
  render() {
    return (
      <div className="component-store">
        <div className="tab-nav">
          <Tab id="Vehicles" display={ this.switchTab } />
          <Tab id="Upgrades" display={ this.switchTab } />
          <Tab id="Achievements" display={ this.switchTab } />
        </div>
        <Catalog activeTab={ this.state.activeTab } />
      </div>
    );
  }
}

class Tab extends React.Component {
  render() {
    return (
      <button className="component-tab" onClick={ this.props.display }>
        { this.props.id }
      </button>
    )
  }
}

class Catalog extends React.Component {
  render() {
    const catalogItems = storeCatalog[this.props.activeTab].map((item) => {
      return <Item key={ item.name } item={ item }/> 
    });
    const catalogRows = [];
    for (let i = 0; i < catalogItems.length; i+=3) {
      catalogRows.push(
        <div key={`row-${i}`} className="row">
          { catalogItems[i] }
          { catalogItems[i + 1] }
          { catalogItems[i + 2] }
        </div>
      );
    }
    return (
      <div className="component-catalog">
      {
        catalogRows
      }
      </div>
    )
  }
}
