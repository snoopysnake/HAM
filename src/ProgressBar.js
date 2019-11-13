import React from 'react';
import './ProgressBar.css';

export default class ProgressBar extends React.Component{
  render() {
    return(
      <div className="component-progress-bar">
        <Progress percent={this.props.percent}/>
      </div>
    )
  }
}

function Progress(props) {
  return <div className="progress" style={{ width: `${props.percent}%` }}/>
}