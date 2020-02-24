import { combineReducers } from 'redux';
import userReducer from './userReducer';
import recipesReducer from './recipesReducer';

const rootReducer = combineReducers({
  user: userReducer,
  recipes: recipesReducer
});

export default rootReducer;
