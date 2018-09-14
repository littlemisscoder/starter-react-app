import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import PropTypes from 'prop-types';

import Header from './components/navigation/header/Header';
import { MainScreen, LoginScreen, RegisterScreen } from './screens';
import { initToken } from './reducers/auth/authActions';

export class App extends Component {
  constructor(props) {
    super(props);
    props.initToken();
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <Header />
          <Route exact path="/" component={MainScreen} />
          <Route path="/login" component={LoginScreen} />
          <Route path="/register" component={RegisterScreen} />
        </div>
      </BrowserRouter>
    );
  }
}

App.propTypes = {
  initToken: PropTypes.func.isRequired
};

App.defaultProps = {};

const mapDispatchToProps = {
  initToken
};

export default connect(
  null,
  mapDispatchToProps
)(App);
