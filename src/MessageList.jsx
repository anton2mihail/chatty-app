import React, { Component } from "react";
import Message from "./Message.jsx";
import PropTypes from "prop-types";
import Notification from "./Notification.jsx";

export default class MessageList extends Component {
  render() {
    const messageList = this.props.messages.map(el => {
      return (
        <Message
          key={el.id}
          currentUser={this.props.currentUser}
          message={el}
        />
      );
    });
    return (
      <main className="messages">
        {messageList}
        <div className="message system">
          <Notification notification={this.props.notification} />
        </div>
      </main>
    );
  }
}
MessageList.propTypes = {
  notification: PropTypes.array,
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      username: PropTypes.string,
      content: PropTypes.string
    })
  ),
  currentUser: PropTypes.object
};
