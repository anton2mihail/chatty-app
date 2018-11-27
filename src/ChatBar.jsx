import React, { Component } from "react";

export default class ChatBar extends Component {
  submitEvt = (evt, code) => {
    if (evt.keyCode == 13 && evt.target.value !== "") {
      if (code === "c") {
        this.props.handleSubmit(evt.target.value);
        evt.target.value = "";
      } else {
        this.props.handleSubmit(evt.target.value, false);
        evt.target.value = "";
      }
    }
  };

  render() {
    const { name } = this.props.currentUser;
    return (
      <footer className="chatbar">
        <input
          className="chatbar-username"
          onKeyUp={e => {
            this.submitEvt(e, "");
          }}
          placeholder={name}
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
