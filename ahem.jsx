
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

// Will move to gamestate in global.js - Implemented here for testing purposes.
var speed = 60;
var distance = 0;
var roundeddistance = 0;
var time = 0;
time = setInterval(timeInc, 1000);
var vehicle = "Wooden Bicycle";

function timeInc()
{
  distance = distance + speed*0.000277778;
  roundeddistance = Math.round(distance * 100)/100;
  time = time + 1;
}

class PlayerFrame extends React.Component{
  render(){
    // time variable needs to be fixed, starts at 1. Displaying with time-1 for now, for concept demonstration purposes.
    return(
      <div style={{backgroundColor: "#01cdfe"}}>
      <center>
      <font color = "FF71CE">
        <h1>{vehicle}</h1>
        <h1>Speed: {speed} MPH</h1>
        <h2>Distance: {roundeddistance} Miles</h2>
        <h2>Time: {time-1}</h2>
      </font>
      </center>
      </div>
    );
  }
}

setInterval(function(){
  ReactDOM.render(<PlayerFrame />, document.getElementById('root'));
}, 1000/60)
