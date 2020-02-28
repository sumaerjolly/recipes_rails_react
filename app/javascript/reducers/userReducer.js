const initState = {
  user: {},
};

const userReducer = (state = initState, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        user: action.user,
      };
    case 'LOGOUT':
      return {
        user: {},
      };
    default:
      return state;
  }
};

export default userReducer;
