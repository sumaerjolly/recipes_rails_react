import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

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
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
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
        <h1>Hi User: {this.props.currentUser}</h1>
        <Link to="/signup">Signup</Link>
        <Link to="/login">Login</Link>
        <Link to="/dashboard" role="button">
          Dashboard Test
        </Link>
        <button onClick={() => this.handleLogoutClick()}>Logout</button>
      </div>
    );
  }
}

export default Home;
