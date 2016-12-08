import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/root';
import configureStore from './store/store';
import * as Util from './utils/session_api_util';

document.addEventListener('DOMContentLoaded', () => {
  const initialState = window.currentUser;

  const store = configureStore({session: initialState});
  const root = document.getElementById('root');
  window.store = store;
  window.login = Util.login;
  ReactDOM.render(<Root store={ store }/>, root);
});
