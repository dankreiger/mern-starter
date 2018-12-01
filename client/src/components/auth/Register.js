import React, { Component } from 'react';
import axios from 'axios';
import classNames from 'classnames';

export default class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      password: '',
      password2: '',
      errors: {}
    };
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    const { name, email, password, password2 } = this.state;
    const newUser = {
      name,
      email,
      password,
      password2
    };
    axios
      .post('/api/users/register', newUser)
      .then(res => console.log(res.data))
      .catch(err => this.setState({ errors: err.response.data }));
  };

  render() {
    const { email, errors, name, password, password2 } = this.state;
    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Sign Up</h1>
              <p className="lead text-center">
                Create your Puppy Connector account
              </p>
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    className={classNames('form-control form-control-lg', {
                      'is-invalid': errors.name
                    })}
                    placeholder="Name"
                    name="name"
                    onChange={this.onChange}
                    value={name}
                  />
                  <div className="invalid-feedback">{errors.name}</div>
                </div>
                <div className="form-group">
                  <input
                    type="email"
                    className="form-control form-control-lg"
                    className={classNames('form-control form-control-lg', {
                      'is-invalid': errors.email
                    })}
                    placeholder="Email Address"
                    name="email"
                    onChange={this.onChange}
                    value={email}
                  />
                  <div className="invalid-feedback">{errors.email}</div>
                  <small className="form-text text-muted">
                    This site uses Gravatar so if you want a profile image, use
                    a Gravatar email
                  </small>
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className={classNames('form-control form-control-lg', {
                      'is-invalid': errors.password
                    })}
                    placeholder="Password"
                    name="password"
                    onChange={this.onChange}
                    value={password}
                  />
                  <div class="invalid-feedback">{errors.password}</div>
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className={classNames('form-control form-control-lg', {
                      'is-invalid': errors.password2
                    })}
                    placeholder="Confirm Password"
                    name="password2"
                    onChange={this.onChange}
                    value={password2}
                  />
                  <div class="invalid-feedback">{errors.password2}</div>
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
