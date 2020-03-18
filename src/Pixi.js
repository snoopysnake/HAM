import React from 'react';
import * as PIXI from 'pixi.js'
import './Pixi.css';

export default class Pixi extends React.Component {
  constructor(props) {
    super(props);
    this.pixiContainer = null;
    this.app = new PIXI.Application({
      backgroundColor: '0xe8a856',
    });
    const girlTexture = PIXI.Texture.from('./assets/girl_side.png');
    this.girl = new PIXI.Sprite(girlTexture);
    this.girl.x = this.app.screen.width / 2;
    this.girl.y = this.app.screen.height;
    this.girl.scale = new PIXI.Point(0.75, 0.75);
    this.app.stage.addChild(this.girl);
    let ticker = PIXI.Ticker.shared;
    ticker.start();
    ticker.add(time => {
    });
    const blurFilter = new PIXI.filters.BlurFilter();
    const colorMatrix = new PIXI.filters.ColorMatrixFilter();
    // colorMatrix.lsd(1);
    this.app.stage.filters = [colorMatrix];
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
    this.girl.x = this.app.screen.width / 2 - 70;
    this.girl.y = this.app.screen.height - 820;
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