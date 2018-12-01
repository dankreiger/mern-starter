import React, { Component } from 'react';
import axios from 'axios';
import classNames from 'classnames';
export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      errors: {}
    };
  }

  onSubmit = e => {
    e.preventDefault();
    const { email, password } = this.state;

    const user = {
      email,
      password
    };
    axios
      .post('/api/users/register', user)
      .then(res => console.log(res.data))
      .catch(err => this.setState({ errors: err.response.data }));
  };
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  render() {
    const { email, errors, password } = this.state;
    return (
      <div className="login">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Log In</h1>
              <p className="lead text-center">
                Sign in to your Puppy Connector account
              </p>
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <input
                    type="email"
                    className={classNames('form-control form-control-lg', {
                      'is-invalid': errors.email
                    })}
                    placeholder="Email Address"
                    name="email"
                    value={email}
                    onChange={this.onChange}
                  />
                  <div className="invalid-feedback">{errors.email}</div>
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className={classNames('form-control form-control-lg', {
                      'is-invalid': errors.password
                    })}
                    placeholder="Password"
                    name="password"
                    value={password}
                    onChange={this.onChange}
                  />
                  <div className="invalid-feedback">{errors.password}</div>
                </div>
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
