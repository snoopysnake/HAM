import React from 'react';
import './Message.css';

export default class Message extends React.Component {
	shouldComponentUpdate(nextProps, nextState) {
		return nextProps.fade !== this.props.fade || nextProps.message !== this.props.message;
	}
  render() {
    return (
      <div>{ this.props.message &&
          <div className={ this.props.fade ? 'message message-fade' : 'message' }>{ this.props.message }</div>
        }
      </div>
    );
  }
}
