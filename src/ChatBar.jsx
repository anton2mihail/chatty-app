import React, { Component } from "react";

export default class ChatBar extends Component {
  submitEvt = evt => {
    if (evt.keyCode == 13 && evt.target.value !== "") {
      this.props.handleSubmit(evt.target.value);
      evt.target.value = "";
    }
  };
  render() {
    const { name } = this.props.currentUser;
    return (
      <footer className="chatbar">
        <input className="chatbar-username" placeholder={name} />
        <input
          onKeyUp={this.submitEvt}
          className="chatbar-message"
          placeholder="Type a message and hit ENTER"
        />
      </footer>
    );
  }
}
