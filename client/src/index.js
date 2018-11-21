import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import "@babel/polyfill"

import App from './components/App'
import store from './store/store'

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app'),
)
