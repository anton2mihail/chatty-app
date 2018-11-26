import React, { Component } from "react";
import Message from "./Message.jsx";

export default class MessageList extends Component {
  render() {
    const messageList = this.props.messages.map(el => {
      return <Message key={el.id} message={el} />;
    });
    return (
      <main className="messages">
        {messageList}
        <div className="message system">
          Anonymous1 changed their name to nomnom.
        </div>
      </main>
    );
  }
}
