import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { loadServer, DevTools } from 'jira-dev-tool'
import { AppProviders } from 'context/index'
import 'antd/dist/antd.less'
loadServer(() => ReactDOM.render(
  <AppProviders>
    <DevTools />
    <App />
  </AppProviders>,
  document.getElementById('root')
))

reportWebVitals();
