import React, { Component } from 'react';



class Editor extends Component {
  updateItem() {
    alert('to do: write update code');
  }
  render() {
    return (
      <div className="editor">
        {
        <dialog className="mdl-dialog">
          <h4 className="mdl-dialog__title">Edit task</h4>
          <div className="mdl-dialog__content">
            {this.props.editorMessage !== "" && 
              <form>
                <div className="mdl-textfield mdl-js-textfield">
                  <input className="mdl-textfield__input" type="text" defaultValue={this.props.editorMessage.text.message} />
                  <label className="mdl-textfield__label" htmlFor="sample1"></label>
                </div>
              </form>
            }
          </div>
          <div className="mdl-dialog__actions">
            <button type="button" className="mdl-button" onClick={() => this.updateItem()}>Update</button>
            <button type="button" className="mdl-button close">Cancel</button>
          </div>
        </dialog>
        }
      </div>
    )
  }
}
export default Editor;