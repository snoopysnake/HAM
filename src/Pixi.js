import React from 'react';
import * as PIXI from 'pixi.js'
import './Pixi.css';

export default class Pixi extends React.Component {
  constructor(props) {
    super(props);
    this.pixiContainer = null;
    this.app = new PIXI.Application({
      autoResize: true,
      resolution: devicePixelRatio
    });
  }
  componentDidMount() {
    window.addEventListener('resize', this.resize);
    this.resize();
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.resize);
  }
  resize = () => {
    const parent = this.app.view.parentNode;
    this.app.renderer.resize(parent.clientWidth, parent.clientHeight);
  }
  updatePixiContainer = element => {
    this.pixiContainer = element;
    if (this.pixiContainer && this.pixiContainer.children.length <= 0) {
      this.pixiContainer.appendChild(this.app.view);
    }
  };
  shouldComponentUpdate() {
    return false;
  }
  render() {
    return (
      <div className="component-pixi" ref={this.updatePixiContainer} />
    );
  }
}