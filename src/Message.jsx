import React, { Component } from "react";
import PropTypes from "prop-types";

export default class Message extends Component {
  render() {
    const { username, content } = this.props.message;

    return (
      <div className="message">
        <span
          className="message-username"
          style={{
            color:
              "" +
              `${
                username == this.props.currentUser.name
                  ? this.props.currentUser.color
                  : ""
              }`
          }}
        >
          {username}
        </span>
        <span className="message-content">{content}</span>
      </div>
    );
  }
}

Message.propTypes = {
  message: PropTypes.shape({
    id: PropTypes.string,
    username: PropTypes.string,
    content: PropTypes.string
  }),
  color: PropTypes.string
};
