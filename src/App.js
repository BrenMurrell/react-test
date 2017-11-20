import React, { Component } from 'react';
import update from 'immutability-helper';
import Editor from './components/Editor';
import fire from './fire';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { messages: [], editorMessage: "" };
    
  }
  handleDataUpdate = function(id, text) {
    var messages = this.state.messages;
    var messageIndex = messages.findIndex(function(m) {
      return m.id === id;
    });

    var updatedMessage = update(messages[messageIndex], { text: { $set: text }});
    var newData = update(messages, {
      $splice: [[messageIndex, 1, updatedMessage]]
    });
    this.setState({messages: newData});

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
      //handleDataUpdate(message.id, message.text);
      var messagesClone = this.state.messages;
      var messageIndex = messagesClone.findIndex(function(m) {
        return m.id === message.id;
      });
      
      messagesClone[messageIndex].text = {
        active: message.text.active,
        message: message.text.message
      }
      this.setState({messages : messagesClone });
      
      
    })
  }
  addMessage(e) {
    e.preventDefault(); // <-- prevent form submit from reloading page
    /* send message to firebase */
    var isActive = Boolean(this.active.value);
    let message = {
      message: this.inputEl.value,
      active: isActive
    }
    fire.database().ref('messages').push (message);
    this.inputEl.value = '';
    var dialog = document.querySelector('dialog');
    dialog.close();
  }
  deleteMessage(message) {
    fire.database().ref('messages').child(message.id).remove();
  }
  // TODO: Add following back in eventually
  // editMessage(message) {
  //   this.setState({editorMessage: message});
  //   var dialog = document.querySelector('dialog');
  //   dialog.showModal();    
  // }
  showAddDialog() {
    var dialog = document.querySelector('dialog');
    dialog.showModal();
  }
  toggleComplete(message) {
    fire.database().ref('messages/' + message.id).set({
      active: !message.text.active,
      message: message.text.message
    })

  }
  cancel() {
    var dialog = document.querySelector('dialog');
    dialog.close();
  }

  render() {
    //set task class
    var taskClass = function(value) {
      return value ? 'complete' : '';
    }
    return (
      
      <div className="appContent">
        { /*  TODO: add this back in when we're ready to edit
          <Editor editorMessage={this.state.editorMessage} />
        */ }
        <button class="mdl-button mdl-js-button mdl-button--fab mdl-button--colored mdl-js-ripple-effect button--add" onClick={()=>this.showAddDialog()}>
          <i class="material-icons">add</i>
        </button>
        <dialog className="mdl-dialog">
          <h4 className="mdl-dialog__title">Add new task</h4>
          <form  onSubmit={this.addMessage.bind(this)}>
            <div className="mdl-dialog__content">
                  <div className="mdl-textfield mdl-js-textfield">
                    <input className="mdl-textfield__input" type="text" ref={ el => this.inputEl = el } />
                    <input type="hidden" name="active" value="" ref={(input) => { this.active = input }} />            
                    <label className="mdl-textfield__label" htmlFor="sample1">Task description...</label>
                  </div>
            </div>
            <div className="mdl-dialog__actions">
              {/* <button type="button" className="mdl-button" onClick={() => this.updateItem()}>Update</button> */}
              <button type="submit" className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--colored">Add new task</button>
              <button type="button" className="mdl-button close" onClick={() => this.cancel()}>Cancel</button>
            </div>
          </form>
        </dialog>
        <table className="tasks mdl-data-table mdl-js-data-table mdl-shadow--2dp">
          <thead>
            <tr>
              <th className="task__done mdl-data-table__cell--non-numeric">Done?</th>              
              <th className="task__desc mdl-data-table__cell--non-numeric">Task</th>
              <th className="task__delete">Actions</th>              
            </tr>
          </thead>
          <tbody>
            {
              this.state.messages.map( message => 
                <tr className={taskClass(message.text.active)} key={message.id}>
                  <td className="mdl-data-table__cell--non-numeric">
                      <input type="checkbox" className="mdl-checkbox__input" id={message.id} key={message.text.active} defaultChecked={message.text.active} onChange={() => {this.toggleComplete(message)}} />
                  </td>
                  <td className="mdl-data-table__cell--non-numeric">
                    {message.text.message} 
                  </td>
                  <td className="mdl-data-table__cell--non-numeric">
                    { /* TODO: add this back in when edit functionality is written
                      <button className="btn--edit mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab material-icons" onClick={() => { this.editMessage(message) }}>mode_edit</button>
                    */ }
                    <button className="btn--delete mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab mdl-button--colored material-icons" onClick={() => { this.deleteMessage(message) }}>remove</button>
                  </td>
                </tr> 
              )   
            }
          </tbody>
        </table>
      </div>
    );
  }
}

export default App;