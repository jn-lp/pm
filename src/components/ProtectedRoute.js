import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { connect } from 'react-redux';

const ProtectedRoute = ({ auth, component: Component, ...rest }) => {
  const { isAuthenticated } = auth;
  return (
    <Route
      {...rest}
      render={(props) => (
        isAuthenticated
          ? <Component {...props} />
          : (
            <Redirect to={{
              pathname: '/login',
              then: rest.location.pathname,
            }}
            />
          )
      )}
    />
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(
  mapStateToProps,
  null,
)(ProtectedRoute);
