import React, { Component } from 'react';
import axios from 'axios';

class Registration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      password_confirmation: '',
      registrationErrors: null
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
        'http://localhost:3000/registrations',
        {
          user: {
            username: this.state.username,
            password: this.state.password,
            password_confirmation: this.state.password_confirmation
          }
        },
        {
          withCredentials: true
        }
      )
      .then(response => {
        if (response.data.status === 'created') {
          this.handleSuccessfulAuth(response.data);
        }
      })
      .catch(error => {
        console.log('registration error', error);
        this.setState({
          ...this.state,
          registrationErrors: true
        });
      });
    e.preventDefault();
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  errorAlert() {
    if (this.state.registrationErrors) {
      return (
        <div
          className="alert alert-warning alert-dismissible fade show"
          role="alert"
        >
          Please Recheck your entered credentials
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
          <input
            type="password"
            name="password_confirmation"
            placeholder="Password Confirmation"
            value={this.state.password_confirmation}
            onChange={this.handleChange}
            required
          />
          <button type="submit">Register</button>
        </form>
      </div>
    );
  }
}

export default Registration;
