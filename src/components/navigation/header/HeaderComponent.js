import React, { Component } from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './HeaderComponent.styles.css';

export default class HeaderComponent extends Component {
  handleNavSelect = selectedKey => {
    if (selectedKey === 'logout') {
      this.props.logoutUser();
    }
  };

  handleResetAuth = () => {
    this.props.resetAuth();
  };

  render() {
    const { isAuthenticated, username } = this.props;
    const signedInText = `Signed in as: ${username}`;
    if (isAuthenticated) {
      return (
        <Navbar collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to="/">Simple App</Link>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Navbar.Text>{signedInText}</Navbar.Text>
            <Nav pullRight onSelect={this.handleNavSelect}>
              <NavItem eventKey="logout">Log Out</NavItem>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      );
    }
    return (
      <Navbar collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/">Simple App</Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav pullRight>
            <LinkContainer to="/login" onClick={this.handleResetAuth}>
              <NavItem>Log In</NavItem>
            </LinkContainer>
            <LinkContainer to="/register" onClick={this.handleResetAuth}>
              <NavItem>Register</NavItem>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

HeaderComponent.propTypes = {
  isAuthenticated: PropTypes.bool,
  username: PropTypes.string,
  logoutUser: PropTypes.func.isRequired,
  resetAuth: PropTypes.func.isRequired
};

HeaderComponent.defaultProps = {
  isAuthenticated: false,
  username: ''
};
