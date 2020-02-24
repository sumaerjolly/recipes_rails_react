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

export { login, logout, setRecipes, setRecipeDetails };
