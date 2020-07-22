import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
import './stylesheets/index.scss';
import App from './components/App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <HashRouter>
    <React.StrictMode>
      <App/>
    </React.StrictMode>
  </HashRouter>,
  document.getElementById('root')
);

serviceWorker.unregister();