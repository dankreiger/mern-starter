import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { registerUser } from './../../actions/authActions';
import FormInput from './../common/FormInput';

class Register extends Component {
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

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
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
    this.props.registerUser(newUser, this.props.history);
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
              <form noValidate onSubmit={this.onSubmit}>
                <FormInput
                  errorMessage={errors.name}
                  onChange={this.onChange}
                  name="name"
                  placeholder="Name"
                  value={name}
                />
                <FormInput
                  errorMessage={errors.email}
                  onChange={this.onChange}
                  name="email"
                  placeholder="Email Address"
                  type="email"
                  value={email}
                  info="This site uses Gravatar so if you want a profile image, use a Gravatar email"
                />
                <FormInput
                  errorMessage={errors.password}
                  onChange={this.onChange}
                  name="password"
                  placeholder="Password"
                  type="password"
                  value={password}
                />
                <FormInput
                  errorMessage={errors.password2}
                  onChange={this.onChange}
                  name="password2"
                  placeholder="Confirm Password"
                  type="password"
                  value={password2}
                />
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Register));
