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
    const girlTexture = PIXI.Texture.from('./assets/girl_side.png');
    this.girl = new PIXI.Sprite(girlTexture);
    this.girl.x = this.app.screen.width / 2;
    this.girl.y = this.app.screen.height;
    this.app.stage.addChild(this.girl);
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