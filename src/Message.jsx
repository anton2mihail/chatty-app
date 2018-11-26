import React, { Component } from "react";

export default class Message extends Component {
  render() {
    const { username, content } = this.props.message;
    return (
      <div className="message">
        <span className="message-username">{username}</span>
        <span className="message-content">{content}</span>
      </div>
    );
  }
}
