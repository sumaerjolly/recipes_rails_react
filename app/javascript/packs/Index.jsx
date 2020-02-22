import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import rootReducer from '../reducers';
import { Provider } from 'react-redux';
import App from '../components/App';

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
