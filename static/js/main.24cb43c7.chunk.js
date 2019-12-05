(this.webpackJsonpham=this.webpackJsonpham||[]).push([[0],{18:function(e,t,a){e.exports=a(42)},23:function(e,t,a){},24:function(e,t,a){},25:function(e,t,a){},36:function(e,t,a){},37:function(e,t,a){},38:function(e,t,a){},39:function(e,t,a){},40:function(e,t,a){},41:function(e,t,a){},42:function(e,t,a){"use strict";a.r(t);var n=a(0),c=a.n(n),i=a(15),r=a.n(i),s=(a(23),a(1)),o=a(2),l=a(5),u=a(3),h=a(8),p=a(4),m=(a(24),a(25),function(e){function t(){return Object(s.a)(this,t),Object(l.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(p.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){return c.a.createElement("div",{className:"component-header"},c.a.createElement("div",{className:"top"},c.a.createElement("h1",null,Math.floor(this.props.currency)," credits")),c.a.createElement("div",{className:"bottom"},c.a.createElement("h1",null,parseFloat(Math.floor(100*this.props.speed)/100).toFixed(2)," MPH"),c.a.createElement("h1",null,parseFloat(Math.floor(100*this.props.distance)/100).toFixed(2)," miles")))}}]),t}(c.a.Component)),d=a(17),v=(a(36),function(e){function t(e){var a;return Object(s.a)(this,t),(a=Object(l.a)(this,Object(u.a)(t).call(this,e))).resize=function(){var e=a.app.view.parentNode;a.app.renderer.resize(e.clientWidth,e.clientHeight)},a.updatePixiContainer=function(e){a.pixiContainer=e,a.pixiContainer&&a.pixiContainer.children.length<=0&&a.pixiContainer.appendChild(a.app.view)},a.pixiContainer=null,a.app=new d.a({autoResize:!0,resolution:devicePixelRatio}),a}return Object(p.a)(t,e),Object(o.a)(t,[{key:"componentDidMount",value:function(){window.addEventListener("resize",this.resize),this.resize()}},{key:"componentWillUnmount",value:function(){window.removeEventListener("resize",this.resize)}},{key:"render",value:function(){return c.a.createElement("div",{className:"component-pixi",ref:this.updatePixiContainer})}}]),t}(c.a.Component)),f=(a(37),function(e){function t(){return Object(s.a)(this,t),Object(l.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(p.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){return c.a.createElement("div",{className:"component-progress-bar"},c.a.createElement(b,{percent:this.props.percent}))}}]),t}(c.a.Component));function b(e){return c.a.createElement("div",{className:"progress",style:{width:"".concat(e.percent,"%")}})}a(38);var E=0,O=function(e){function t(){return Object(s.a)(this,t),Object(l.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(p.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){var e=Math.floor(this.props.time)%60,t=1===e?e+" second":e+" seconds",a=Math.floor(this.props.time/60%60),n=0===a?"":1===a?a+" minute":a+" minutes",i=Math.floor(this.props.time/60/60),r=0===i?"":1===i?i+" hour":i+" hours";return c.a.createElement("div",{className:"component-statistics"},c.a.createElement("h1",null,"Stats"),c.a.createElement(j,{name:"Time Elapsed",value:"".concat(r," ").concat(n," ").concat(t)}),c.a.createElement(j,{name:"Current Vehicle",value:this.props.currentVehicle.name}),c.a.createElement(j,{name:"Vehicle Min Speed",value:this.props.currentVehicle.minSpeed+" MPH"}),c.a.createElement(j,{name:"Vehicle Max Speed",value:this.props.currentVehicle.maxSpeed+" MPH"}),c.a.createElement(j,{name:"Top Speed",value:this.props.speed>E?E=parseFloat(this.props.speed).toFixed(2):E+" MPH"}),c.a.createElement("h1",null,"Vehicles Owned"),c.a.createElement("h1",null,"Achievements"),c.a.createElement("div",null,"You have no achievements :("))}}]),t}(c.a.Component),j=function(e){function t(){return Object(s.a)(this,t),Object(l.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(p.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){return c.a.createElement("div",{className:"component-stat"},c.a.createElement("div",{className:"label"},this.props.name,":"),c.a.createElement("div",{className:"value"},this.props.value))}}]),t}(c.a.Component),y=(a(39),function(e){function t(){return Object(s.a)(this,t),Object(l.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(p.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){return c.a.createElement("div",{className:"component-vehicle"},this.props.currentVehicle.name)}}]),t}(c.a.Component)),k=(a(40),function(e){function t(e){var a;return Object(s.a)(this,t),(a=Object(l.a)(this,Object(u.a)(t).call(this,e))).purchaseItem=a.purchaseItem.bind(Object(h.a)(a)),a}return Object(p.a)(t,e),Object(o.a)(t,[{key:"purchaseItem",value:function(){this.props.purchaseItem(this.props.item)}},{key:"render",value:function(){var e="./assets/".concat(this.props.item.name.replace(" ","_").toLowerCase(),".png");return c.a.createElement("div",{className:"component-item",onClick:this.purchaseItem},c.a.createElement("img",{src:e,alt:this.props.item.name}),c.a.createElement("div",{className:"item-cost"},this.props.item.cost),c.a.createElement("div",{className:"item-name"},this.props.item.name))}}]),t}(c.a.Component)),x=[{vehicle:"Bicycle",upgrades:[{name:"Upgrade 1",cost:10},{name:"Upgrade 2",cost:20}],nextVehicle:{name:"Grom",cost:100}}],N=(a(41),function(e){function t(e){var a;return Object(s.a)(this,t),(a=Object(l.a)(this,Object(u.a)(t).call(this,e))).state={catalogIndex:0},a}return Object(p.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){for(var e=this,t=x[this.state.catalogIndex].upgrades.map((function(t){return c.a.createElement(k,{key:t.name,item:t,purchaseItem:e.props.purchaseItem})})),a=[],n=0;n<t.length;n+=3)a.push(c.a.createElement("div",{key:"row-".concat(n),className:"row"},t[n],t[n+1],t[n+2]));return c.a.createElement("div",{className:"component-store"},c.a.createElement("h1",null,"Upgrades"),a,c.a.createElement("div",null,c.a.createElement("div",{className:"next-vehicle"},"Next Vehicle:"),c.a.createElement(k,{item:x[this.state.catalogIndex].nextVehicle,purchaseItem:this.props.purchaseItem})))}}]),t}(c.a.Component)),g="\u3010\ufeff\uff28\uff21\uff2d\u3011\uff36\uff41\uff50\uff4f\uff52\uff24\uff52\uff49\uff56\uff45\u200b\u200b",w=!1,C=function(e){function t(e){var a;return Object(s.a)(this,t),(a=Object(l.a)(this,Object(u.a)(t).call(this,e))).speedUp=a.speedUp.bind(Object(h.a)(a)),a.purchaseStoreItem=a.purchaseStoreItem.bind(Object(h.a)(a)),a.state={currentVehicle:{name:"Bicycle",minSpeed:8,maxSpeed:20},speed:0,distance:0,time:0,currency:0},a}return Object(p.a)(t,e),Object(o.a)(t,[{key:"componentDidMount",value:function(){var e=this;this.titleTimer=setInterval((function(){return e.shiftTitle()}),666),this.tickTimer=setInterval((function(){return e.tick()}),1e3/60)}},{key:"componentWillUnmount",value:function(){clearInterval(this.tickTimer)}},{key:"shiftTitle",value:function(){g=g.substring(1,g.length)+g.charAt(0),document.title=g}},{key:"tick",value:function(){var e;e=w?this.state.currentVehicle.maxSpeed:Math.max(this.state.currentVehicle.minSpeed,this.state.speed-1/60);var t=this.state.distance+277778e-9*this.state.speed/60,a=this.state.time+1/60,n=this.state.currency+277778e-9*this.state.speed/60*100;this.setState({speed:e,distance:t,time:a,currency:n})}},{key:"purchaseStoreItem",value:function(e){this.state.currency>=e.cost?(alert(e.name+" purchased!"),this.setState({currentVehicle:e,currency:this.state.currency-e.cost})):alert("Not enough credits for ".concat(e.name,"!"))}},{key:"speedUp",value:function(){this.state.speed+1>=this.state.currentVehicle.maxSpeed&&(w=!0,clearTimeout(this.topSpeedTimer),this.topSpeedTimer=setTimeout((function(){w=!1}),200)),this.setState({speed:Math.min(this.state.currentVehicle.maxSpeed,this.state.speed+1)})}},{key:"render",value:function(){return c.a.createElement("div",{className:"component-app"},c.a.createElement("div",{className:"view",onClick:this.speedUp},c.a.createElement(m,{speed:this.state.speed,distance:this.state.distance,currency:this.state.currency}),c.a.createElement(v,null)),c.a.createElement(f,{percent:100*(this.state.distance-Math.floor(this.state.distance))}),c.a.createElement("div",{className:"menu"},c.a.createElement(O,{currentVehicle:this.state.currentVehicle,speed:this.state.speed,distance:this.state.distance,time:this.state.time}),c.a.createElement(y,{currentVehicle:this.state.currentVehicle}),c.a.createElement(N,{distance:this.state.distance,currency:this.state.currency,purchaseItem:this.purchaseStoreItem})))}}]),t}(c.a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));r.a.render(c.a.createElement(C,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[18,1,2]]]);
//# sourceMappingURL=main.24cb43c7.chunk.js.map