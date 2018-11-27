import React, { Component } from "react";
import PropTypes from "prop-types";

export default class UsersOnline extends Component {
  render() {
    return (
      <p className="usersOnline">
        {this.props.numberUsers}
        {" Users Online"}
      </p>
    );
  }
}

UsersOnline.propTypes = {
  numberUsers: PropTypes.number
};
