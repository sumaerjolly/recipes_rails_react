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
      .delete('/logout', { withCredentials: true })
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
      <ul className="navbar-nav ml-auto">
        <li className="nav-item pr-2">
          <NavLink to="/recipes" className="nav-link">
            Recipes
          </NavLink>
        </li>
        <li className="nav-item pr-2">
          <NavLink to="/favourites" className="nav-link">
            Favourites
          </NavLink>
        </li>
        <li className="nav-item pr-2 pt-1">
          <button
            className="btn btn-danger btn-sm"
            type="button"
            onClick={() => this.handleLogoutClick()}
          >
            Logout
          </button>
        </li>
      </ul>
    ) : (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <NavLink to="/login" className="nav-link">
            Login
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/Signup" className="nav-link">
            Signup
          </NavLink>
        </li>
      </ul>
    );

    return (
      <nav
        className="navbar navbar-expand-lg navbar-dark bg-dark"
        // style={{ backgroundColor: '#ee5435' }}
      >
        <NavLink to="/" className="navbar-brand">
          Recipe App
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          {navlinks}
        </div>
      </nav>
    );
  }
}

export default withRouter(Navbar);
