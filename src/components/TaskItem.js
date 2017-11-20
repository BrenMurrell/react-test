import React, { Component } from 'react';
import fire from '../fire';

class Task extends Component  {
    //functions for this component    
    deleteMessage = function(message) {
        //delete message from firebase using id of message
        fire.database().ref('messages').child(message.id).remove();
    }
    toggleComplete = function(message) {
        //update message in database
        fire.database().ref('messages/' + message.id).set({
            active: !message.text.active,
            message: message.text.message
        });
    }
    taskClass = function(value) {
        //toggle class of active / complete tasks
        return value ? 'complete' : '';
    }

    render() {
        const message = this.props.task;
        return (
            <tr className={this.taskClass(message.text.active)} key={message.id}>
                <td className="mdl-data-table__cell--non-numeric">
                    <input type="checkbox" className="mdl-checkbox__input" id={message.id} key={message.text.active} defaultChecked={message.text.active} onChange={() => {this.toggleComplete(message)}} />
                </td>
                <td className="mdl-data-table__cell--non-numeric">
                    {message.text.message} 
                </td>
                <td className="mdl-data-table__cell--non-numeric">
                    <button className="btn--delete mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab mdl-button--colored material-icons" onClick={() => { this.deleteMessage(message) }}>remove</button>
                </td>
            </tr> 
        )
    }
}
export default Task;