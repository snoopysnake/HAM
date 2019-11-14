import React from 'react';
import {storeCatalog} from './StoreItems'
import './Store.css';

export default class Store extends React.Component {
  render() {
    // storeCatalog[0].func();
    return (
      <div>
        <TabsContainer>
          <Tab id="Store" active="true">{storeCatalog[0].name}</Tab>
          <Tab id="Upgrades">asdgf</Tab>
          <Tab id="Achievements">zxcvbn</Tab>
        </TabsContainer>
      </div>
    );
  }
}

class TabsContainer extends React.Component {
  activateTab(){

  }

  render() {
    // TabsContainer creates a button for each Tab element within it
    var tabHeaders = this.props.children.map(function(child){
        if(child.type === Tab){
          return <button className="Tab" onClick={alert}>{child.props.id}</button>
        }
    });
    return (
      <div className="tabs">
        <div className="tabHeaders">
          {tabHeaders}
        </div>
        <div className="tabContent">
          {this.props.children}
        </div>
      </div>
    )
  }
}

class Tab extends React.Component {
  constructor(props){
    super(props);
    // this.activate = this.activate.bind(this);
  }
  activate(){
    alert('!!!');
  }

  render() {
    return (
      <div>
        {this.props.children}
      </div>
    )
  }
}
