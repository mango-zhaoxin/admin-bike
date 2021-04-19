import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import Admin from './admin'
import reportWebVitals from './reportWebVitals';
// import Life from './pages/demo/Life.js';
import Home from '../src/pages/router-demo/router1/Home.js'

ReactDOM.render(
  <React.StrictMode>
    {/* <Admin /> */}
    <Home />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
