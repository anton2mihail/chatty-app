import React, { Component } from "react";
import PropTypes from "prop-types";

export default class Notification extends Component {
  /**
   *Creates an instance of Notification.
   * @param {*} props
   * @memberof Notification
   */
  constructor(props) {
    super(props);
    this.state = {
      isHidden: false
    };
  }
  /**
   *Handles the click of the dismiss button
   *
   * @memberof Notification
   */
  handleClick = e => {
    this.setState({
      isHidden: true
    });
    setTimeout(() => {
      this.setState({
        isHidden: false
      });
    }, 3000);
  };

  /**
   *
   *
   * @returns jsx to display Notification
   * @memberof Notification
   */
  render() {
    return (
      <div
        style={
          this.state.isHidden
            ? {
                display: "none"
              }
            : { display: "block" }
        }
      >
        {this.props.notification[0] ? this.props.notification[0] : ""}
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
          <button
            onClick={e => {
              this.handleClick(e);
            }}
          >
            Dismiss
          </button>
        ) : (
          ""
        )}
      </div>
    );
  }
}
// Prop validation
Notification.propTypes = {
  notification: PropTypes.arrayOf(
    PropTypes.shape({
      content: PropTypes.string,
      type: PropTypes.string
    })
  )
};
