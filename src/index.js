import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();

//global functions for dialogs
var dialog = document.querySelector('dialog');
//var showDialogButton = document.querySelector('#show-dialog');


// dialog.querySelector('.close').addEventListener('click', function() {
//   dialog.close();
// });