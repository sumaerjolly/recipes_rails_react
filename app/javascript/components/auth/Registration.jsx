import React, { Component } from 'react';
import axios from 'axios';

class Registration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      password_confirmation: '',
      registrationErrors: null,
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
        '/registrations',
        {
          user: {
            username: this.state.username,
            password: this.state.password,
            password_confirmation: this.state.password_confirmation,
          },
        },
        {
          withCredentials: true,
        },
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
          registrationErrors: true,
        });
      });
    e.preventDefault();
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  errorAlert() {
    if (this.state.registrationErrors) {
      return (
        <div
          className="alert alert-warning alert-dismissible fade show mt-0 mb-0"
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
        <section className="min-vh-100 cover">
          <div className="cover-caption">
            <div className="container">
              <div className="row text-white">
                <div className="col-xl-5 col-lg-6 col-md-8 col-sm-10 mx-auto text-center form p-4">
                  <h3 className="display-4 py-2 text-truncate">Sign Up</h3>
                  <div className="px-2">
                    <form
                      onSubmit={this.handleSubmit}
                      className="justify-content-center"
                    >
                      <div className="form-group">
                        <label className="sr-only">Username</label>
                        <input
                          className="form-control"
                          type="text"
                          name="username"
                          placeholder="username"
                          value={this.state.username}
                          onChange={this.handleChange}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label className="sr-only">Password</label>
                        <input
                          className="form-control"
                          type="password"
                          name="password"
                          placeholder="Password"
                          value={this.state.password}
                          onChange={this.handleChange}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label className="sr-only">Password Confirmation</label>
                        <input
                          className="form-control"
                          type="password"
                          name="password_confirmation"
                          placeholder="Password Confirmation"
                          value={this.state.password_confirmation}
                          onChange={this.handleChange}
                          required
                        />
                      </div>
                      <button type="submit" className="btn-custom">
                        Sign Up
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default Registration;
