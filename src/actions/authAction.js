import API from '../API';
import { returnErrors } from './errorAction';

import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
} from './types';

// Setup config/headers and jwt
export const jwtConfig = (getState) => {
  // Get jwt from localstorage
  const { jwt } = getState().auth;

  // Headers
  const config = {
    headers: {
      'Content-type': 'application/json',
    },
  };

  // If jwt, add to headers
  if (jwt) config.headers.authorization = jwt;

  return config;
};

// Check jwt & load user
export const loadUser = () => (dispatch, getState) => {
  // User loading
  dispatch({ type: USER_LOADING });

  API
    .get('user', jwtConfig(getState))
    .then((res) => dispatch({
      type: USER_LOADED,
      payload: res.data,
    }))
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: AUTH_ERROR,
      });
    });
};

// Register User
export const register = ({ username, password }) => (dispatch) => {
  // Headers
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  // Request body
  const body = JSON.stringify({ username, password });

  API
    .post('signup', body, config)
    .then((res) => dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    }))
    .catch((err) => {
      dispatch(
        returnErrors(err.response.data, err.response.status, 'REGISTER_FAIL'),
      );
      dispatch({
        type: REGISTER_FAIL,
      });
    });
};

// Login User
export const login = ({ username, password }) => (dispatch) => {
  // Headers
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  // Request body
  const body = JSON.stringify({ username, password });

  API
    .post('login', body, config)
    .then((res) => dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    }))
    .catch((err) => {
      dispatch(
        returnErrors(err.response.data, err.response.status, 'LOGIN_FAIL'),
      );
      dispatch({
        type: LOGIN_FAIL,
      });
    });
};

// Logout User
export const logout = () => ({
  type: LOGOUT_SUCCESS,
});
