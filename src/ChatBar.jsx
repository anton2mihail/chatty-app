import React, { Component } from "react";
import PropTypes from "prop-types";

export default class ChatBar extends Component {
  /**
   *Only handles the submit event of the input form if it's not empty and the user hits the enter key to signify that they're done
   *
   * @memberof ChatBar
   */
  submitEvt = (evt, code) => {
    if (evt.keyCode == 13 && evt.target.value.trim() !== "") {
      if (code === "c") {
        this.props.handleSubmit(evt.target.value.trim());
        evt.target.value = "";
      } else {
        this.props.handleSubmit(evt.target.value.trim(), false);
        evt.target.value = "";
      }
    }
  };

  /**
   *
   *
   * @returns jsx to display ChatBar
   * @memberof ChatBar
   */
  render() {
    const { name, set } = this.props.currentUser;
    return (
      <footer className="chatbar">
        <input
          className="chatbar-username"
          onKeyUp={e => {
            this.submitEvt(e, "");
          }}
          placeholder={set ? name : "Your name: (Optional)"}
        />
        <input
          onKeyUp={e => {
            this.submitEvt(e, "c");
          }}
          className="chatbar-message"
          placeholder="Type a message and hit ENTER"
        />
      </footer>
    );
  }
}
// Prop validation
ChatBar.propTypes = {
  handleSubmit: PropTypes.func,
  currentUser: PropTypes.shape({
    name: PropTypes.string,
    set: PropTypes.bool,
    color: PropTypes.string
  })
};
