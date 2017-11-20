import React, { Component } from 'react';
import fire from './fire';

import AddTask from './components/AddTask';
import TaskList from './components/TaskList';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { messages: [], editorMessage: "" };
  }
  
  
  componentWillMount() {
    /* create ref to messages in Firebase database */
    let messagesRef = fire.database().ref('messages').orderByKey().limitToLast(100);
    
    messagesRef.on('child_added', snapshot => {
      /* update react state when message is added at FB database */
      let message = { text: snapshot.val(), id: snapshot.key};
      this.setState({ messages: [message].concat(this.state.messages ) })
    })
    messagesRef.on('child_removed',  snapshot => {
      /* update react state when message is removed at FB database */
      let message = { text: snapshot.val(), id: snapshot.key };
      this.setState({
        messages: this.state.messages.filter((x) => x.id !== message.id)
      })
    })
    messagesRef.on('child_changed', snapshot => {
      let message = { text: snapshot.val(), id: snapshot.key};
      //create a clone of  messages (avoid mutation issues)
      var messagesClone = this.state.messages;
      //find index of changed message in cloned list
      var messageIndex = messagesClone.findIndex(function(m) {
        return m.id === message.id;
      });
      //update this message with new data
      messagesClone[messageIndex].text = {
        active: message.text.active,
        message: message.text.message
      }
      //update the messages in app state
      this.setState({messages : messagesClone });    
    })
  }
  

  render() {
    return (  
      <div className="appContent">
        <AddTask />        
        <TaskList messages={this.state.messages} />
      </div>
    );
  }
}

export default App;