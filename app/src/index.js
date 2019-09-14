// REACT IMPORTS
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from "react-dom";

// APP IMPORT
import App from './App';

// SERVICE WORKER IMPORT
import * as serviceWorker from '../../app/src/serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
