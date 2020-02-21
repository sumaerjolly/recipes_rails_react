import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Registration from './auth/Registration';
import Login from './auth/Login';

// class Home extends Component {
//   constructor(props) {
//     super(props);

//   }

//   render() {
//     return (
//       <div>
//         <h1>Status: {this.props.loggedInStatus}</h1>
//         <Registration />
//         <Link to="/dashboard" role="button">
//           Dashboard Test
//         </Link>
//       </div>
//     );
//   }
// }

// with the redirect for authentication

class Home extends Component {
  constructor(props) {
    super(props);
    this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
  }
  handleSuccessfulAuth(data) {
    this.props.handleLogin(data);
    this.props.history.push('/dashboard');
  }

  handleLogoutClick() {
    axios
      .delete('logout.json', { withCredentials: true })
      .then(response => {
        this.props.handleLogout();
      })
      .catch(error => {
        console.log('logout error', error);
      });
  }

  render() {
    return (
      <div>
        <h1>Status: {this.props.loggedInStatus}</h1>
        <Registration handleSuccessfulAuth={this.handleSuccessfulAuth} />
        <Login handleSuccessfulAuth={this.handleSuccessfulAuth} />
        <Link to="/dashboard" role="button">
          Dashboard Test
        </Link>
        <button onClick={() => this.handleLogoutClick()}>Logout</button>
      </div>
    );
  }
}

export default Home;
