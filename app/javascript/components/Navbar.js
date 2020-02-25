import React, { Component } from 'react';
import { Link, NavLink, withRouter } from 'react-router-dom';
import axios from 'axios';

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
  }
  handleLogoutClick() {
    axios
      .delete('logout.json', { withCredentials: true })
      .then(response => {
        this.props.handleLogout();
        this.props.history.push('/');
      })
      .catch(error => {
        console.log('logout error', error);
      });
  }
  render() {
    const navlinks = this.props.currentUser ? (
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <NavLink to="/recipes">Recipes</NavLink>
        </li>
        <li>
          <NavLink to="/favourites">Favourites</NavLink>
        </li>
        <li>
          <button onClick={() => this.handleLogoutClick()}>Logout</button>
        </li>
      </ul>
    ) : (
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <NavLink to="/login">Login</NavLink>
        </li>
        <li>
          <NavLink to="/Signup">Signup</NavLink>
        </li>
      </ul>
    );
    return <div>{navlinks}</div>;
  }
}

export default withRouter(Navbar);
