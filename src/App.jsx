import React, { Component } from "react";
import ChatBar from "./ChatBar.jsx";
import MessageList from "./MessageList.jsx";

class App extends Component {
  constructor(props) {
    super(props);
    this.socket = new WebSocket("ws://localhost:3001");
    this.state = {
      messages: [],
      currentUser: { name: "Bob" }
    };
  }
  createMessage = (text, user) => {
    const prevID = this.state.messages[this.state.messages.length - 1].id;
    let newID = prevID.valueOf();
    return {
      id: ++newID,
      username: user,
      content: text
    };
  };
  handleSubmit = content => {
    const currentMessages = this.state.messages;
    const newMessage = this.createMessage(content, this.state.currentUser.name);
    this.setState({
      messages: [...currentMessages, newMessage]
    });
    this.socket.send(JSON.stringify(newMessage));
  };

  render() {
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">
            Chatty
          </a>
        </nav>
        <MessageList messages={this.state.messages} />
        <ChatBar
          handleSubmit={this.handleSubmit}
          currentUser={this.state.currentUser}
        />
      </div>
    );
  }
}
export default App;
