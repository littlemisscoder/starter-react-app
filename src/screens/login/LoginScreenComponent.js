import React, { PureComponent } from 'react';
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
import './LoginScreenComponent.styles.css';

export default class LoginScreenComponent extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      isLoading: false
    };
  }

  static getDerivedStateFromProps(props) {
    if (props.loginError != null && props.loginError.length > 0) {
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
      this.props.loginUser(username, password);
    }
  };

  render() {
    const { from } = this.props.location.state || { from: { pathname: '/' } };
    const { isAuthenticated, loginError } = this.props;
    const { isLoading } = this.state;

    if (isAuthenticated) {
      return <Redirect to={from} />;
    }

    return (
      <div className="login-screen-container">
        <div className="login-screen-content-container">
          <PageHeader>Log In</PageHeader>
          {loginError == null || loginError.length === 0 ? null : (
            <Alert bsStyle="danger">{loginError}</Alert>
          )}
          <form>
            <FormGroup controlId="loginText" className="login-inputs">
              <ControlLabel>Username</ControlLabel>
              <FormControl
                className=" login-text"
                type="text"
                value={this.state.name}
                placeholder="Username"
                onChange={this.handleUsernameChange}
                maxLength={20}
                autoComplete="nope"
                required
              />
            </FormGroup>
            <FormGroup controlId="loginPassword" className="login-inputs">
              <ControlLabel>Password</ControlLabel>
              <FormControl
                className="login-password"
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
              {isLoading ? 'Submitting...' : 'Submit'}
            </Button>
          </form>
          <div className="login-link-footer">
            {"Don't have an account?"}
            <Link to="/register" onClick={this.handleResetAuth}>
              Register
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

LoginScreenComponent.propTypes = {
  loginError: PropTypes.string,
  isAuthenticated: PropTypes.bool,
  loginUser: PropTypes.func.isRequired,
  location: PropTypes.object,
  resetAuth: PropTypes.func.isRequired
};

LoginScreenComponent.defaultTypes = {
  loginError: null,
  isAuthenticated: false,
  location: null
};
