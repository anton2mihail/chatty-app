import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class UsersOnline extends Component {
  /**
   *
   *
   * @returns jsx to display UsersOnline component
   * @memberof UsersOnline
   */
  render() {
    return (
      <p className="usersOnline">
        {this.props.numberUsers}
        {' Users Online'}
      </p>
    );
  }
}
// Prop validation
UsersOnline.propTypes = {
  numberUsers: PropTypes.number
};
