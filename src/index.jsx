import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';

import './style.scss';

const isOpenFalse = false;

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Provider store={store}>
      {isOpenFalse ? (
        <div className="loading">
          <h2>Закрыты до 3 числа</h2>
          <h1>С новым годом 🎄</h1>
        </div>
      ) : (
        <App />
      )}
    </Provider>
  </BrowserRouter>
);
