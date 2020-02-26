const login = user => ({
  type: 'LOGIN',
  user,
});

const logout = () => ({
  type: 'LOGOUT',
});

const setRecipes = recipes => ({
  type: 'SET_RECIPES',
  recipes,
});

const setRecipeDetails = recipe => ({
  type: 'SET_RECIPE_DETAILS',
  recipe,
});

const setFavourites = favourites => ({
  type: 'SET_FAVOURITES',
  favourites,
});

export {
  login, logout, setRecipes, setRecipeDetails, setFavourites,
};
