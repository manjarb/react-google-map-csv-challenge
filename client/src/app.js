import React from 'react'
import 'bulma/css/bulma.css'
import {
  BrowserRouter as Router, Route, Link, Redirect,
} from 'react-router-dom'
import { Provider } from 'react-redux'

import store from './redux/store'

const App = () => (
  <Provider store={store}>
    <Router>
      <h1>TEST</h1>
      {/* <Route path="/" exact render={() => (<Redirect to="/admin" />)} /> */}
      {/* <Route path="/admin" exact component={Admin} /> */}
    </Router>
  </Provider>
)

export default App
