const login = user => ({
  type: 'LOGIN',
  user: user
});

const logout = () => ({
  type: 'LOGOUT'
});

const setRecipes = recipes => ({
  type: 'SET_RECIPES',
  recipes: recipes
});

const setRecipeDetails = recipe => ({
  type: 'SET_RECIPE_DETAILS',
  recipe: recipe
});

const setFavourites = favourites => ({
  type: 'SET_FAVOURITES',
  favourites: favourites
});

export { login, logout, setRecipes, setRecipeDetails, setFavourites };
