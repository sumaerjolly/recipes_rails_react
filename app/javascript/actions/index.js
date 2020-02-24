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

export { login, logout, setRecipes };
