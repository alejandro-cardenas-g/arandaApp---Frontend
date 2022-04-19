import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import { ArandaApp } from './ArandaApp';
import './styles/arandaApp.scss';

ReactDOM.render(
  <React.StrictMode>
    <ArandaApp />
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
