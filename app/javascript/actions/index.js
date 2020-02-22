const login = user => ({
  type: 'LOGIN',
  user: user
});

const logout = () => ({
  type: 'LOGOUT'
});

export { login, logout };
