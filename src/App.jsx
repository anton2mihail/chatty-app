import React, { Component } from "react";
import ChatBar from "./ChatBar.jsx";
import MessageList from "./MessageList.jsx";
import { createSocket, onIncoming, sendNewMessage } from "./services/socket";
const Socket = createSocket("ws://localhost:3001");

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      currentUser: { name: "Bob" }
    };
  }

  updateUser = newUser => {
    this.setState({
      currentUser: { name: newUser }
    });
  };
  componentDidMount() {
    Socket.onmessage = msg => {
      this.handleIncoming(msg.data);
    };
  }

  handleIncoming = msg => {
    const currentMessages = this.state.messages;
    const newMessage = JSON.parse(msg);
    this.setState({
      messages: [...currentMessages, newMessage]
    });
  };

  createMessage = (text, user) => {
    return {
      username: user,
      content: text
    };
  };
  handleSubmit = (content, bool = true) => {
    if (bool) {
      const newMessage = this.createMessage(
        content,
        this.state.currentUser.name
      );
      sendNewMessage(Socket, newMessage);
    } else {
      this.updateUser(content);
    }
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
