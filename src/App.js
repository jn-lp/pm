import React, { useEffect } from 'react';
import {
  Route, Switch,
} from 'react-router-dom';
import { connect } from 'react-redux';
import ProtectedRoute from './components/ProtectedRoute';

import store from './store';
import { loadUser } from './actions/authAction';

import './App.css';

import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import Loading from './pages/Loading';
import Home from './pages/Home';
import Dashboard from './pages/dashboard/Dashboard';

const App = ({ auth }) => {
  useEffect(() => {
    if (auth.jwt) store.dispatch(loadUser());
  }, [auth.jwt]);

  const { isAuthenticated } = auth;

  return auth.jwt && !auth.user ? <Loading /> : (
    <Switch>
      <Route path="/" exact>
        <Home isAuthenticated={isAuthenticated} />
      </Route>
      <Route path="/login/" component={Login} />
      <Route path="/signup/" component={Signup} />
      <ProtectedRoute path="/dashboard" component={Dashboard} />
    </Switch>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(
  mapStateToProps,
  null,
)(App);
