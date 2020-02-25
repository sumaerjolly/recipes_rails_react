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
          className="alert alert-warning alert-dismissible fade show mt-0 mb-0"
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
        <section id="cover" className="min-vh-100">
          <div id="cover-caption">
            <div className="container">
              <div className="row text-white">
                <div className="col-xl-5 col-lg-6 col-md-8 col-sm-10 mx-auto text-center form p-4">
                  <h3 className="display-4 py-2 text-truncate">Sign In</h3>
                  <div className="px-2">
                    <form
                      onSubmit={this.handleSubmit}
                      className="justify-content-center"
                    >
                      <div className="form-group">
                        <label className="sr-only">Username</label>
                        <input
                          type="text"
                          className="form-control"
                          name="username"
                          placeholder="Username"
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
                      <button type="submit" className="btn-custom">
                        Sign In
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

export default Login;
