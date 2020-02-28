const recipeReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_RECIPE_DETAILS':
      return action.recipe;
    default:
      return state;
  }
};

export default recipeReducer;
