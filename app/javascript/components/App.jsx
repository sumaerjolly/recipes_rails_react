// import React from 'react';
// import Routes from '../routes/Index';

// export default props => <>{Routes}</>;
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import axios from 'axios';
import Home from './Home';
import Dashboard from './Dashboard';
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
      loggedInStatus: 'NOT_LOGGED_IN',
      user: {}
    };
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  checkLoginStatus() {
    axios
      .get('logged_in.json', { withCredentials: true })
      .then(response => {
        if (
          response.data.logged_in &&
          this.state.loggedInStatus === 'NOT_LOGGED_IN'
        ) {
          this.setState({
            loggedInStatus: 'LOGGED_IN',
            user: response.data.user
          });
        } else if (
          !response.data.logged_in &
          (this.state.loggedInStatus === 'LOGGED_IN')
        ) {
          this.setState({
            loggedInStatus: 'NOT_LOGGED_IN',
            user: {}
          });
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
    this.setState({
      loggedInStatus: 'LOGGED_IN',
      user: data.user
    });
  }

  handleLogout() {
    this.setState({
      loggedInStatus: 'NOT_LOGGED_IN',
      user: {}
    });
  }

  render() {
    return (
      <div className="app">
        <Router>
          <Switch>
            <Route
              path="/"
              exact
              render={props => (
                <Home
                  {...props}
                  handleLogin={this.handleLogin}
                  handleLogout={this.handleLogout}
                  loggedInStatus={this.state.loggedInStatus}
                />
              )}
            />
            <Route
              path="/dashboard"
              exact
              render={props => (
                <Dashboard
                  {...props}
                  loggedInStatus={this.state.loggedInStatus}
                />
              )}
            />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
