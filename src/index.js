import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Provider from './context/Provider';
import './index.css';
import App from './App';

ReactDOM.render(
  <main>
    <Provider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </main>,
  document.getElementById('root'),
);
