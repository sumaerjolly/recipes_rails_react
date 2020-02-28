import { combineReducers } from 'redux';
import userReducer from './userReducer';
import recipesReducer from './recipesReducer';
import recipeReducer from './recipeReducer';
import favouritesReducer from './favouritesReducer';

const rootReducer = combineReducers({
  user: userReducer,
  recipes: recipesReducer,
  recipe: recipeReducer,
  favourites: favouritesReducer,
});

export default rootReducer;
