import App from "./App";
import ReactDOM from 'react-dom';
import { SnackbarProvider } from 'notistack';
import React from 'react';
import { createStore } from 'redux';
import {Provider} from 'react-redux';
import reducers from "./components/store/reducer";

let store = createStore(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

ReactDOM.render(
  <Provider store={store}>
    <SnackbarProvider maxSnack={3}>
        <App />
    </SnackbarProvider>
  </Provider>

  , document.getElementById('root'));
