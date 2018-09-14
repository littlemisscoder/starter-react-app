import React, { Component } from 'react';
import {
  FormGroup,
  FormControl,
  ControlLabel,
  PageHeader,
  Alert,
  Button
} from 'react-bootstrap';
import { Redirect, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './RegisterScreenComponent.styles.css';

export default class RegisterScreenComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      isLoading: false
    };
  }

  static getDerivedStateFromProps(props) {
    if (props.registerError != null && props.registerError.length > 0) {
      return { isLoading: false };
    }
    return null;
  }

  handleUsernameChange = e => {
    this.setState({ username: e.target.value });
  };

  handlePasswordChange = e => {
    this.setState({ password: e.target.value });
  };

  handleResetAuth = () => {
    this.props.resetAuth();
  };

  isValidInputs() {
    const { username, password } = this.state;
    return username.trim().length > 0 && password.trim().length > 0;
  }

  onSubmit = () => {
    const { username, password } = this.state;
    if (this.isValidInputs()) {
      this.setState({ isLoading: true });
      this.props.registerUser(username, password);
    }
  };

  render() {
    const { from } = this.props.location.state || { from: { pathname: '/' } };
    const { isAuthenticated, registerError } = this.props;
    const { isLoading } = this.state;

    if (isAuthenticated) {
      return <Redirect to={from} />;
    }

    return (
      <div className="register-screen-container">
        <div className="register-screen-content-container">
          <PageHeader>Create Account</PageHeader>
          {registerError == null || registerError.length === 0 ? null : (
            <Alert bsStyle="danger">{registerError}</Alert>
          )}
          <form>
            <FormGroup controlId="registerText" className="register-inputs">
              <ControlLabel>Username</ControlLabel>
              <FormControl
                className="register-text"
                type="text"
                value={this.state.name}
                placeholder="Username"
                onChange={this.handleUsernameChange}
                maxLength={20}
                autoComplete="nope"
              />
            </FormGroup>
            <FormGroup controlId="registerPassword" className="register-inputs">
              <ControlLabel>Password</ControlLabel>
              <FormControl
                className="register-password"
                type="password"
                value={this.state.name}
                placeholder="Password"
                onChange={this.handlePasswordChange}
                minLength={8}
                maxLength={20}
                autoComplete="new-password"
              />
            </FormGroup>
            <Button
              bsStyle="primary"
              type="submit"
              onClick={this.onSubmit}
              disabled={isLoading || !this.isValidInputs()}
            >
              {isLoading ? 'Registering...' : 'Register'}
            </Button>
            <div className="register-link-footer">
              Have an existing account?{' '}
              <Link to="/login" onClick={this.handleResetAuth}>
                Log In
              </Link>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

RegisterScreenComponent.propTypes = {
  registerError: PropTypes.string,
  isAuthenticated: PropTypes.bool,
  registerUser: PropTypes.func.isRequired,
  location: PropTypes.object,
  resetAuth: PropTypes.func.isRequired
};

RegisterScreenComponent.defaultTypes = {
  registerError: null,
  isAuthenticated: false,
  location: null
};
