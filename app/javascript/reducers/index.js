import { combineReducers } from 'redux';
import userReducer from './userReducer';
import recipesReducer from './recipesReducer';
import recipeReducer from './recipeReducer';

const rootReducer = combineReducers({
  user: userReducer,
  recipes: recipesReducer,
  recipe: recipeReducer
});

export default rootReducer;
