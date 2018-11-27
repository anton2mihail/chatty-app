import React, { Component } from "react";
import Message from "./Message.jsx";
import PropTypes from "prop-types";

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
          {this.props.notification[0]}
          {
            <p
              style={{
                paddingLeft: "5"
              }}
            >
              &nbsp;
            </p>
          }
          {this.props.notification[0] ? (
            <button onClick={() => {}}>Dismiss</button>
          ) : (
            ""
          )}
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
