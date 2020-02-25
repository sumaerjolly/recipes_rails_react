import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import rootReducer from '../reducers';
import { Provider } from 'react-redux';
import App from '../components/App';
import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';
import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';

const store = createStore(rootReducer);
store.subscribe(() => {
  console.log(store.getState());
});

document.addEventListener('DOMContentLoaded', () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.body.appendChild(document.createElement('div'))
  );
});
