import React from 'react'
import 'bulma/css/bulma.css'
import {
  BrowserRouter as Router, Route, Link, Redirect, withRouter,
} from 'react-router-dom'
import { Provider } from 'react-redux'

import store from './redux/store'
import { Landing, Detail, Login } from './containers'
import { Auth } from './auth/auth'

const Public = () => <h3>Public Content</h3>
const Protected = () => <h3>Protected Content</h3>

const ProtectedRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => (
      Auth.isAuthenticated === true
        ? <Component {...props} /> : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
    )}
  />
)

const App = () => (
  <Provider store={store}>
    <Router>
      {/* <Route path="/" exact render={() => (<Redirect to="/admin" />)} /> */}
      {/* <Route path="/admin" exact component={Admin} /> */}
      <ProtectedRoute path="/" exact component={Landing} />
      <ProtectedRoute path="/csv/:id" exact component={Detail} />
      <Route path="/login" component={withRouter(Login)} />
    </Router>
  </Provider>
)

export default App
