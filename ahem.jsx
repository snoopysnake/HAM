
// class Clock extends React.Component{
//   render(){
//     var d = new Date();
//     var ts = d.toLocaleTimeString();
//     var ms = d.getMilliseconds();
//     return (
//       <div>
//         <h1>Current time: {ts}</h1>
//         <h2>Milliseconds: {ms}</h2>
//       </div>
//     );
//   }
// }

// CSS constants
const divStyle = {
  textAlign: 'center',
  margin: 'auto',
  border: '5px solid pink',
  color: '#FF71CE',
  background: '#01CDFE',
};

const progressStyle = {
  margin: 'auto',
  width: '50%',
  backgroundColor: 'grey',
};

const progressInnerStyle = {
  width: '1%',
  height: '30px',
  backgroundColor: 'green',
};


// Will move to gamestate in global.js - Implemented here for testing purposes.
var vehicles = {
    v01: {
      name: "Wooden Bicycle",
      min_speed: 10,
      max_speed: 60
    },
    v02: {
      name: "Racing Bike",
      min_speed: 10,
      max_speed: 35
    }
}
var currentVehicle = vehicles.v01;
var speed = 30;
var distance = 0;
var roundeddistance = 0;
var time = 0;

console.log(currentVehicle.name)

// Constant variables. Does not change during runtime
const milesToMph = 0.000277778;
const ticksPerSecond = 60;

// Our core game loop.
function tick(){
  // Speed decay
  speed = Math.max(currentVehicle.min_speed, speed - (1 / ticksPerSecond));

  // Travel more distance
  distance = distance + ((speed*milesToMph) / ticksPerSecond);
  time = time + (1/ticksPerSecond);
}

function goFaster(){
  // roundeddistance = Math.round(distance * 100)/100;
  speed = Math.min(currentVehicle.max_speed, speed + 1);
}

class PlayerFrame extends React.Component{
  render(){
    // time variable needs to be fixed, starts at 1. Displaying with time-1 for now, for concept demonstration purposes.
    return(
      <div style={divStyle}>
        <h1>{currentVehicle.name}</h1>
        <h1>Speed: {parseFloat(Math.round(speed * 100)/100).toFixed(2)} MPH</h1>
        <h2>Distance: {parseFloat(Math.round(distance * 100)/100).toFixed(2)} Miles</h2>
        <MileMarker />
        <h2>Time: {parseFloat(Math.round(time * 100) / 100).toFixed(2)}</h2>
        <SpeedButton />
      </div>
    );
  }
}

class SpeedButton extends React.Component{
  render(){
    return(
      <div>
        <button onClick={() => goFaster()}>Click to go faster!</button>
      </div>
    );
  }
}

class MileMarker extends React.Component{
  render(){
    const barStyle = {
      margin: 'auto',
      width: '50%'
    }

    $( "#progressbar" ).progressbar({
      value: (distance - Math.floor(distance)) * 100
    });
    return(
      <div id="progressbar" style={barStyle}>
      </div>
    );
  }
}

// Major game logic
setInterval(tick, 1000/ticksPerSecond);

// Refresh the display 60 times per second
setInterval(function(){
  ReactDOM.render(<PlayerFrame />, document.getElementById('root'));
}, 1000/60)
