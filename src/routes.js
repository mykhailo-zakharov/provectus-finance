import React from 'react'
import { Route, IndexRoute } from 'react-router'

import App from './containers/App'
import Home from './components/Home'
// import NewEmployee from './components/NewEmployee'
import NotFound from './components/NotFound'


export const routes = (
  <div>
    <Route path='/' component={App}>
      <IndexRoute component={Home} />
      {/*<Route path='/new-employee' component={NewEmployee} />*/}
    </Route>
    <Route path='*' component={NotFound} />
  </div>
)
