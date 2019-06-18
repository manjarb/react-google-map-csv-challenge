import React from 'react'
import 'bulma/css/bulma.css'
import {
  BrowserRouter as Router, Route, Link, Redirect,
} from 'react-router-dom'
import { Provider } from 'react-redux'

import store from './redux/store'
import { Landing, Detail } from './containers'

const App = () => (
  <Provider store={store}>
    <Router>
      {/* <Route path="/" exact render={() => (<Redirect to="/admin" />)} /> */}
      {/* <Route path="/admin" exact component={Admin} /> */}
      <Route path="/" exact component={Landing} />
      <Route path="/csv/:id" exact component={Detail} />
    </Router>
  </Provider>
)

export default App
