import React, { Component } from 'react';
//import update from 'immutability-helper';
import fire from '../fire';


class AddTask extends Component  {
    
    addMessage = function(e) {
        e.preventDefault(); 
        //convert active to boolean
        var isActive = Boolean(this.active.value);
        //get values from form
        let message = {
          message: this.inputEl.value,
          active: isActive
        }
        //push this data to firebase
        fire.database().ref('messages').push (message);
        //clear form and close dialog
        this.inputEl.value = '';
        var dialog = document.querySelector('dialog');
        dialog.close();
    }
    showAddDialog = function() {
        var dialog = document.querySelector('dialog');
        dialog.showModal();
    }
    cancel = function() {
        this.inputEl.value = '';
        var dialog = document.querySelector('dialog');
        dialog.close();
    }
    render() {
        return (
            <div>
                <button className="mdl-button mdl-js-button mdl-button--fab mdl-button--colored mdl-js-ripple-effect button--add" onClick={()=>this.showAddDialog()}>
                    <i className="material-icons">add</i>
                </button>
                <dialog className="mdl-dialog">
                    <h4 className="mdl-dialog__title">Add new task</h4>
                    <form onSubmit={this.addMessage.bind(this)}>
                    <div className="mdl-dialog__content">
                        <div className="mdl-textfield mdl-js-textfield">
                            <input className="mdl-textfield__input" type="text" ref={ el => this.inputEl = el } />
                            <input type="hidden" name="active" value="" ref={(input) => { this.active = input }} />            
                            <label className="mdl-textfield__label" htmlFor="sample1">Task description...</label>
                        </div>
                    </div>
                    <div className="mdl-dialog__actions">
                        <button type="submit" className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--colored">Add new task</button>
                        <button type="button" className="mdl-button close" onClick={() => this.cancel()}>Cancel</button>
                    </div>
                    </form>
                </dialog>
            </div>
        )
    }
}
export default AddTask;