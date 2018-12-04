import React, { Component } from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';
import UsersOnline from './UsersOnline.jsx';
import { createSocket, onIncoming, sendNewMessage } from './services/socket';
const Socket = createSocket('ws://localhost:3001');

class App extends Component {
  /**
   *Creates an instance of App.
   * @param {*} props
   * @memberof App
   */
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      currentUser: { name: 'Anonymous', set: false, color: null },
      notification: [],
      numberUsers: 0
    };
  }
  /**
   *Sets up a listener for messages from the websocket server right after the component mounts
   *
   * @memberof App
   */
  componentDidMount() {
    Socket.onmessage = msg => {
      let data = JSON.parse(msg.data);
      switch (data.type) {
        case 'incomingMessage':
          this.handleIncoming(data);
          break;
        case 'incomingNotification':
          this.createNotification(data);
          // handle incoming notification
          break;
        case 'newUser':
          this.setState(prev => {
            let newState = Object.create(prev);
            newState.numberUsers = data.numberUsers;
            return newState;
          });
          break;
        default:
          // show an error in the console if the message type is unknown
          throw new Error('Unknown event type ' + data.type);
      }
    };
  }

  /**
   *Handles the display of notifications by cycling though them every 5.6 seconds
   *
   * @param {*} prevProps
   * @param {*} prevState
   * @memberof App
   */
  componentDidUpdate(prevProps, prevState) {
    if (prevState.notification[0] !== this.state.notification[0]) {
      console.log('new notification');
      this.timer = setTimeout(() => {
        this.timer = null;
        this.setState(prev => {
          let newState = Object.create(prev);
          newState.notification = [...newState.notification];
          newState.notification.shift();
          return newState;
        });
      }, 5600);
    }
  }
  /**
   *Makes sure to stop the timeout once the component dismounts
   *
   * @memberof App
   */
  componentWillUnmount() {
    if (this.timer) {
      clearTimeout(this.timer);
    }
  }

  /**
   *Handles the update of the current user's name, and sends a notification to the websocket server
   *
   * @memberof App
   */
  updateUser = newUser => {
    Socket.send(
      JSON.stringify({
        type: 'postNotification',
        content: `${this.state.currentUser.name} has changed their username to ${newUser}`
      })
    );
    this.setState({
      currentUser: {
        name: newUser,
        set: true,
        color: this.state.currentUser.color
      }
    });
  };

  /**
   *Adds to the array of notifications
   *
   * @memberof App
   */
  createNotification = data => {
    this.setState(prev => {
      let newState = Object.create(prev);
      newState.notification = [...newState.notification, data.content];
      return newState;
    });
  };

  /**
   *Builds a message object based on passed properties
   *
   * @memberof App
   */
  createMessage = (text, user, type) => {
    return {
      type: type,
      username: user,
      content: text
    };
  };

  /**
   *Deals with incoming messages from the websocket server
   *
   * @memberof App
   */
  handleIncoming = msg => {
    const currentMessages = this.state.messages;
    const newMessage = msg;
    this.setState({
      messages: [...currentMessages, newMessage]
    });
  };

  /**
   *Handles the submit of all input elements based on the passed properties
   *
   * @memberof App
   */
  handleSubmit = (content, bool = true) => {
    if (bool) {
      const newMessage = this.createMessage(content, this.state.currentUser.name, 'postMessage');
      sendNewMessage(Socket, newMessage);
    } else {
      this.updateUser(content);
    }
  };

  /**
   *Builds the App component
   *
   * @returns jsx to display
   * @memberof App
   */
  render() {
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">
            Chatty
          </a>
          <UsersOnline numberUsers={this.state.numberUsers} />
        </nav>
        <MessageList
          currentUser={this.state.currentUser}
          messages={this.state.messages}
          notification={this.state.notification}
        />
        <ChatBar handleSubmit={this.handleSubmit} currentUser={this.state.currentUser} />
      </div>
    );
  }
}
export default App;
