import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import {ThemeProvider} from 'styled-components'
import Theme from './styled-components/main'
import { Provider } from 'react-redux';
import store from './store'
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
    <ThemeProvider theme={Theme}>
    <App />
    </ThemeProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);


