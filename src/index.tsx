import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { loadDevTools } from 'jira-dev-tool'

loadDevTools(() => ReactDOM.render(
  <App />,
  document.getElementById('root')
))

reportWebVitals();
