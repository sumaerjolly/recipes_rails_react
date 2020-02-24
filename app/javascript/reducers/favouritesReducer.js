const favouritesReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_FAVOURITES':
      return action.favourites;
    default:
      return state;
  }
};

export default favouritesReducer;
