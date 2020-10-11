import React from 'react';
import * as PIXI from 'pixi.js'
import './Pixi.css';

export default class Pixi extends React.Component {
  constructor(props) {
    super(props);
    this.pixiRef = React.createRef();
    // const blurFilter = new PIXI.filters.BlurFilter();
    // const colorMatrix = new PIXI.filters.ColorMatrixFilter();
    // colorMatrix.lsd(1);
    // this.props.app.stage.filters = [colorMatrix];
  }
  componentDidMount() {
    this.pixiRef.current.appendChild(this.props.app.view);
    window.addEventListener('resize', this.resize);
    this.resize();
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.resize);
  }
  resize = () => {
    const parent = this.props.app.view.parentNode;
    this.props.app.renderer.resize(parent.clientWidth, parent.clientHeight);
    for(let prop in this.props.sprites) {
      const sprite = this.props.sprites[prop];
      sprite.scale = new PIXI.Point(parent.clientHeight/960, parent.clientHeight/960);
      sprite.y = parent.clientHeight - sprite.height - 50;
    }
  }
  shouldComponentUpdate() {
    return false;
  }
  render() {
    return (
      <div className="component-pixi" ref={this.pixiRef} />
    );
  }
}