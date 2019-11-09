import { combineReducers } from 'redux';
import errorReducer from './errorReducer';
import authReducer from './authReducer';
import projectReducer from './projectReducer';

export default combineReducers({
  error: errorReducer,
  auth: authReducer,
  project: projectReducer,
});
