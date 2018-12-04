import React, { Component } from "react";
import PropTypes from "prop-types";

export default class ChatBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nameChng: ""
    };
  }
  /**
   *Only handles the submit event of the input form if it's not empty and the user hits the enter key to signify that they're done
   *
   * @memberof ChatBar
   */
  submitEvt = (evt, code) => {
    if (evt.keyCode === 13 && evt.target.value.trim() !== "") {
      this.props.handleSubmit(evt.target.value.trim(), true);
      evt.target.value = "";
    }
  };

  changeEvt = evt => {
    this.setState({
      nameChng: evt.target.value.trim()
    });
    setTimeout(() => {
      if (this.state.nameChng !== "") {
        this.props.handleSubmit(this.state.nameChng, false);
        //evt.target.value = "";
      }
    }, 1000);
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
          onChange={e => {
            this.changeEvt(e, "");
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
