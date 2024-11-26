import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';

import './style.scss';

const isOpenFalse = true;

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Provider store={store}>
      {isOpenFalse ? (
        <div className="loading">
          <h2>Ведутся технические работы</h2>
          <h1>😢</h1>
        </div>
      ) : (
        <App />
      )}
    </Provider>
  </BrowserRouter>
);
