import API from '../API';
import { returnErrors } from './errorAction';

import {
  PROJECT_LOADED,
  PROJECT_LOADING,
  PROJECT_GET_ERROR,
  PROJECT_GET_SUCCESS,
  PROJECT_GET_FAIL,
  PROJECT_CREATE_SUCCESS,
  PROJECT_CREATE_FAIL,
  UNSET_PROJECT,
} from './types';

// Setup config/headers and jwt
export const jwtConfig = (getState) => {
  // Get jwt from localstorage
  const { projJwt } = getState().proj;

  // Headers
  const config = {
    headers: {
      'Content-type': 'application/json',
    },
  };

  // If jwt, add to headers
  if (projJwt) config.headers.proj = projJwt;

  return config;
};

// Check jwt & load project
export const loadProject = () => (dispatch, getState) => {
  // Project loading
  dispatch({ type: PROJECT_LOADING });

  API
    .get('project', jwtConfig(getState))
    .then((res) => dispatch({
      type: PROJECT_LOADED,
      payload: res.data,
    }))
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: PROJECT_GET_ERROR,
      });
    });
};

// Create Project
export const createProject = ({ name, ownerJWT }) => (dispatch) => {
  // Headers
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  // Request body
  const body = JSON.stringify({ name, ownerJWT });

  API
    .post('create', body, config)
    .then((res) => dispatch({
      type: PROJECT_CREATE_SUCCESS,
      payload: res.data,
    }))
    .catch((err) => {
      dispatch(
        returnErrors(err.response.data, err.response.status, 'PROJECT_CREATE_FAIL'),
      );
      dispatch({
        type: PROJECT_CREATE_FAIL,
      });
    });
};

// Get Project
export const getProject = ({ name, memberJWT }) => (dispatch) => {
  // Headers
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  // Request body
  const body = JSON.stringify({ name, memberJWT });

  API
    .post('getproj', body, config)
    .then((res) => dispatch({
      type: PROJECT_GET_SUCCESS,
      payload: res.data,
    }))
    .catch((err) => {
      dispatch(
        returnErrors(err.response.data, err.response.status, 'PROJECT_GET_FAIL'),
      );
      dispatch({
        type: PROJECT_GET_FAIL,
      });
    });
};

export const unsetProject = () => ({
  type: UNSET_PROJECT,
});
