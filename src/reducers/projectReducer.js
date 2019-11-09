import {
  PROJECT_LOADED,
  PROJECT_LOADING,
  PROJECT_GET_ERROR,
  PROJECT_GET_SUCCESS,
  PROJECT_GET_FAIL,
  PROJECT_CREATE_SUCCESS,
  PROJECT_CREATE_FAIL,
  UNSET_PROJECT,
} from '../actions/types';

export default (
  state = {
    proj_jwt: localStorage.getItem('proj_jwt'),
    hasCurrent: null,
    isLoading: false,
    project: null,
  }, action,
) => {
  switch (action.type) {
    case PROJECT_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case PROJECT_LOADED:
      return {
        ...state,
        hasCurrent: true,
        isLoading: false,
        project: action.payload,
      };
    case PROJECT_GET_SUCCESS:
    case PROJECT_CREATE_SUCCESS:
      localStorage.setItem('proj_jwt', action.payload.proj_jwt);
      return {
        ...state,
        ...action.payload,
        hasCurrent: true,
        isLoading: false,
      };
    case PROJECT_GET_ERROR:
    case PROJECT_GET_FAIL:
    case PROJECT_CREATE_FAIL:
    case UNSET_PROJECT:
      localStorage.removeItem('proj_jwt');
      return {
        ...state,
        proj_jwt: null,
        project: null,
        hasCurrent: false,
        isLoading: false,
      };
    default:
      return state;
  }
};
