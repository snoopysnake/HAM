
class Clock extends React.Component{
  render(){
    var d = new Date();
    var ts = d.toLocaleTimeString();
    var ms = d.getMilliseconds();
    return (
      <div>
        <h1>Current time: {ts}</h1>
        <h2>Milliseconds: {ms}</h2>
      </div>
    );
  }
}

setInterval(function(){
  ReactDOM.render(<Clock />, document.getElementById('root'));
}, 1000/60)
