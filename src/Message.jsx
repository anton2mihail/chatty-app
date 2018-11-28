import React, { Component } from "react";
import PropTypes from "prop-types";

export default class Message extends Component {
  /**
   *
   *
   * @returns jsx to display Message
   * @memberof Message
   */
  render() {
    const { username, content } = this.props.message;

    return (
      <div className="message">
        <span
          className="message-username"
          style={{
            color:
              "" + `${this.props.message.color ? this.props.message.color : ""}`
          }}
        >
          {username}
        </span>
        <span className="message-content">{content}</span>
      </div>
    );
  }
}
// Prop validation
Message.propTypes = {
  message: PropTypes.shape({
    id: PropTypes.string,
    username: PropTypes.string,
    content: PropTypes.string
  }),
  color: PropTypes.string
};
