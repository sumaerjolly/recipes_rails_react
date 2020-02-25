import React, { Component } from 'react';
import axios from 'axios';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      loginErrors: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this);
    this.errorAlert = this.errorAlert.bind(this);
  }

  handleSuccessfulAuth(data) {
    this.props.handleLogin(data);
    this.props.history.push('/recipes');
  }

  handleSubmit(e) {
    axios
      .post(
        '/sessions',
        {
          user: {
            username: this.state.username,
            password: this.state.password
          }
        },
        {
          withCredentials: true
        }
      )
      .then(response => {
        if (response.data.logged_in) {
          this.handleSuccessfulAuth(response.data);
        } else if (response.data.status === 401) {
          this.setState({
            ...this.state,
            loginErrors: true
          });
        }
      })
      .catch(error => {
        console.log('login error', error);
      });
    e.preventDefault();
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  errorAlert() {
    if (this.state.loginErrors) {
      return (
        <div
          className="alert alert-warning alert-dismissible fade show"
          role="alert"
        >
          Please Recheck your login Credentials
          <button
            type="button"
            className="close"
            data-dismiss="alert"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      );
    }
  }

  render() {
    return (
      <div>
        {this.errorAlert()}
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="username"
            value={this.state.username}
            onChange={this.handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={this.state.password}
            onChange={this.handleChange}
            required
          />
          <button type="submit">Login</button>
        </form>
      </div>
    );
  }
}

export default Login;
