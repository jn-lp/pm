import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import errorReducer from './errorReducer';
import authReducer from './authReducer';

export default combineReducers({
  error: errorReducer,
  auth: authReducer,
  routing: routerReducer,
});
