import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import { Router, browserHistory } from 'react-router'
import { Provider } from 'react-redux'
import configureStore from './store/configureStore'
import { routes } from './routes'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Authentication from './containers/LoginPage/Authentication'

const store = configureStore()

render(
  <Provider store={store}>
      <MuiThemeProvider>
          <Authentication>
            <Router history={browserHistory} routes={routes} />
          </Authentication>
      </MuiThemeProvider>
  </Provider>,
  document.getElementById('root')
)


