import React from 'react';
import * as PIXI from 'pixi.js'
import './Pixi.css';


export default class Pixi extends React.Component {
  constructor(props) {
    super(props);
    this.app = null;
    this.canvasElements = [];
  }

  componentDidMount() {
    var canvas = document.getElementById('pixi-canvas');
    var parent = document.getElementById('pixi-canvas').parentElement;

    // Graphics examples: https://pixijs.io/examples/#/graphics/dynamic.js
    this.app = new PIXI.Application({width: parent.clientWidth, height: parent.clientHeight, view: canvas, resizeTo: parent});
    this.app.renderer.backgroundColor = 0x061639;


    function centeredRedSquare(app){
      const graphics = new PIXI.Graphics();
      // Rectangle
      console.log(graphics);
      graphics.position.x += (parent.clientWidth / 2);
      graphics.position.y += (parent.clientHeight / 2);
      graphics.beginFill(0xDE3249);
      graphics.drawRect(-75, -75, 150, 150);
      graphics.endFill();
      app.stage.addChild(graphics);
    }
    this.canvasElements.push(centeredRedSquare);
  }
  render(){
    if(this.app){
        var stage = this.app.stage;
        for (var i = stage.children.length - 1; i >= 0; i--) {	stage.removeChild(stage.children[i]);};
    }
    for(var i = 0; i < this.canvasElements.length; i++){
      this.canvasElements[i](this.app);
    }
    return <canvas id="pixi-canvas"></canvas>;
  }
}
