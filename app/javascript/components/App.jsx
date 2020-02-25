// import React from 'react';
// import Routes from '../routes/Index';

// export default props => <>{Routes}</>;
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import axios from 'axios';
import Home from './Home';
import { connect } from 'react-redux';
import { login, logout } from '../actions/index';
import Dashboard from './Dashboard';
import Recipes from './Recipes';
import Recipe from './Recipe';
import Favourites from './Favourites';
import Registration from './auth/Registration';
import Login from './auth/Login';
import Navbar from './Navbar';
// normal method
// class App extends Component {
//   render() {
//     return (
//       <div className="app">
//         <Router>
//           <Switch>
//             <Route path="/" exact component={Home} />
//             <Route path="/dashboard" exact component={Dashboard} />
//           </Switch>
//         </Router>
//       </div>
//     );
//   }
// }

// with the redirect from authentication
class App extends Component {
  constructor() {
    super();
    this.state = {
      user: {}
    };
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  checkLoginStatus() {
    const { login, logout } = this.props;
    axios
      .get('logged_in.json', { withCredentials: true })
      .then(response => {
        if (response.data.logged_in) {
          this.setState({
            user: response.data.user
          });
          login(response.data.user);
        } else if (!response.data.logged_in) {
          logout();
        }
      })
      .catch(error => {
        console.log('check login error', error);
      });
  }

  componentDidMount() {
    this.checkLoginStatus();
  }

  handleLogin(data) {
    const { login } = this.props;
    this.setState({
      user: data.user
    });
    login(data.user);
  }

  handleLogout() {
    this.setState({
      user: {}
    });
    const { logout } = this.props;
    logout();
  }

  render() {
    const { user } = this.props;
    // console.log(user.user.username);
    return (
      <div className="app">
        <Router>
          <Navbar
            currentUser={user.user.username}
            handleLogout={this.handleLogout}
          />
          <Switch>
            <Route
              path="/"
              exact
              render={props => (
                <Home
                  {...props}
                  handleLogin={this.handleLogin}
                  handleLogout={this.handleLogout}
                  currentUser={user.user.username}
                />
              )}
            />
            <Route
              path="/dashboard"
              exact
              render={props => (
                <Dashboard {...props} currentUser={user.user.username} />
              )}
            />
            <Route
              path="/signup"
              exact
              render={props => (
                <Registration {...props} handleLogin={this.handleLogin} />
              )}
            />
            <Route
              path="/login"
              exact
              render={props => (
                <Login {...props} handleLogin={this.handleLogin} />
              )}
            />
            <Route path="/recipes" exact component={Recipes} />
            <Route path="/favourites" exact component={Favourites} />
            <Route path="/recipe/:id" exact component={Recipe} />
          </Switch>
        </Router>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user
});

const mapDispatchToProps = dispatch => ({
  login: user => dispatch(login(user)),
  logout: () => dispatch(logout())
});

// export default App;
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
