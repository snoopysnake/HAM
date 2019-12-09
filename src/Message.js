import React from 'react';
import './Message.css';

export default class Message extends React.Component {
  render() {
    return (
      <div>{ this.props.message &&
          <div className={ this.props.fade ? 'message message-fade' : 'message' }>{ this.props.message }</div>
        }
      </div>
    );
  }
}
