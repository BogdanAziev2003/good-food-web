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
          <h2>Сайт временно недоступен из-за технических работ</h2>
          <h3>
            <span>8 (989) 037-68-83</span>
          </h3>
        </div>
      ) : (
        <App />
      )}
    </Provider>
  </BrowserRouter>
);
