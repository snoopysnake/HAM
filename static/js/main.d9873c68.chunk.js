(this.webpackJsonpham=this.webpackJsonpham||[]).push([[0],{18:function(e,t,n){e.exports=n(41)},23:function(e,t,n){},24:function(e,t,n){},25:function(e,t,n){},36:function(e,t,n){},37:function(e,t,n){},38:function(e,t,n){},39:function(e,t,n){},40:function(e,t,n){},41:function(e,t,n){"use strict";n.r(t);var a=n(0),i=n.n(a),c=n(15),r=n.n(c),s=(n(23),n(1)),o=n(2),l=n(5),u=n(3),p=n(11),h=n(4),m=(n(24),n(25),function(e){function t(){return Object(s.a)(this,t),Object(l.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(h.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){return i.a.createElement("div",{className:"component-header"},i.a.createElement("div",{className:"top"},i.a.createElement("h1",null,this.props.currency," credits")),i.a.createElement("div",{className:"bottom"},i.a.createElement("h1",null,parseFloat(Math.round(100*this.props.speed)/100).toFixed(2)," MPH"),i.a.createElement("h1",null,parseFloat(Math.round(100*this.props.distance)/100).toFixed(2)," miles")))}}]),t}(i.a.Component)),d=n(17),v=(n(36),function(e){function t(e){var n;return Object(s.a)(this,t),(n=Object(l.a)(this,Object(u.a)(t).call(this,e))).resize=function(){var e=n.app.view.parentNode;n.app.renderer.resize(e.clientWidth,e.clientHeight)},n.updatePixiContainer=function(e){n.pixiContainer=e,n.pixiContainer&&n.pixiContainer.children.length<=0&&n.pixiContainer.appendChild(n.app.view)},n.pixiContainer=null,n.app=new d.a({autoResize:!0,resolution:devicePixelRatio}),n}return Object(h.a)(t,e),Object(o.a)(t,[{key:"componentDidMount",value:function(){window.addEventListener("resize",this.resize),this.resize()}},{key:"componentWillUnmount",value:function(){window.removeEventListener("resize",this.resize)}},{key:"render",value:function(){return i.a.createElement("div",{className:"component-pixi",ref:this.updatePixiContainer})}}]),t}(i.a.Component)),f=(n(37),function(e){function t(){return Object(s.a)(this,t),Object(l.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(h.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){return i.a.createElement("div",{className:"component-progress-bar"},i.a.createElement(b,{percent:this.props.percent}))}}]),t}(i.a.Component));function b(e){return i.a.createElement("div",{className:"progress",style:{width:"".concat(e.percent,"%")}})}n(38);var j=0,O=function(e){function t(){return Object(s.a)(this,t),Object(l.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(h.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){return i.a.createElement("div",{className:"component-statistics"},i.a.createElement("h1",null,"Stats"),i.a.createElement("h3",null,"Time Elapsed: ",Math.floor(this.props.time)),i.a.createElement("h3",null,"Current Vehicle: ",this.props.currentVehicle.type),i.a.createElement("h3",null,"Vehicle Min Speed: ",this.props.currentVehicle.minSpeed," MPH"),i.a.createElement("h3",null,"Vehicle Max Speed: ",this.props.currentVehicle.maxSpeed," MPH"),i.a.createElement("h3",null,"All-Time Max Speed: ",this.props.speed>j?j=parseFloat(this.props.speed).toFixed(2):j," MPH"))}}]),t}(i.a.Component),E=(n(39),function(e){function t(){return Object(s.a)(this,t),Object(l.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(h.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){return i.a.createElement("div",{className:"component-vehicle"},"This is where the vehicle graphic/blueprint will be.")}}]),t}(i.a.Component)),y=(n(40),function(e){function t(){return Object(s.a)(this,t),Object(l.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(h.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){return i.a.createElement("div",{className:"component-store"},"This is where the store will be.")}}]),t}(i.a.Component)),w=function(e){function t(e){var n;return Object(s.a)(this,t),(n=Object(l.a)(this,Object(u.a)(t).call(this,e))).speedUp=n.speedUp.bind(Object(p.a)(n)),n.state={currentVehicle:{type:"Bicycle",minSpeed:10,maxSpeed:35},speed:0,distance:0,time:0,currency:0},n}return Object(h.a)(t,e),Object(o.a)(t,[{key:"componentDidMount",value:function(){var e=this;this.timer=setInterval((function(){return e.tick()}),1e3/60)}},{key:"componentWillUnmount",value:function(){clearInterval(this.timer)}},{key:"tick",value:function(){var e=Math.max(this.state.currentVehicle.minSpeed,this.state.speed-1/60),t=this.state.distance+277778e-9*this.state.speed/60,n=this.state.time+1/60,a=Math.round(100*t);this.setState({speed:e,distance:t,time:n,currency:a})}},{key:"speedUp",value:function(){this.setState({speed:Math.min(this.state.currentVehicle.maxSpeed,this.state.speed+1)})}},{key:"render",value:function(){return i.a.createElement("div",{className:"component-app"},i.a.createElement("div",{className:"view",onClick:this.speedUp},i.a.createElement(m,{speed:this.state.speed,distance:this.state.distance,currency:this.state.currency}),i.a.createElement(v,null)),i.a.createElement(f,{percent:100*(this.state.distance-Math.floor(this.state.distance))}),i.a.createElement("div",{className:"menu"},i.a.createElement(O,{currentVehicle:this.state.currentVehicle,speed:this.state.speed,distance:this.state.distance,time:this.state.time}),i.a.createElement(E,{currentVehicle:this.state.currentVehicle}),i.a.createElement(y,{distance:this.state.distance,currency:this.state.currency})))}}]),t}(i.a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));r.a.render(i.a.createElement(w,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[18,1,2]]]);
//# sourceMappingURL=main.d9873c68.chunk.js.map