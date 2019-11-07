class Pixi extends React.Component {
	constructor(props) {
		super(props);
		this.pixiContainer = null;
		this.app = new PIXI.Application({
			autoResize: true,
			resolution: devicePixelRatio
		});
		console.log('asdf',window.devicePixelRatio)
	}
	updatePixiContainer = element => {
		this.pixiContainer = element;
		if (this.pixiContainer && this.pixiContainer.children.length <= 0) {
			this.pixiContainer.appendChild(this.app.view);
		}
	};
	render() {
		return (
			<div className="pixi-container" ref={this.updatePixiContainer} />
		);
	}
}