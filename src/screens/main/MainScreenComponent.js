import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { DefaultScreen } from './DefaultScreen';

class MainScreenComponent extends Component {
  render() {
    const { match, isAuthenticated, location } = this.props;

    if (isAuthenticated) {
      return (
        <div>
          <Route exact path={match.path} component={DefaultScreen} />
        </div>
      );
    }

    return (
      <Redirect
        to={{
          pathname: '/login',
          state: { from: location }
        }}
      />
    );
  }
}

MainScreenComponent.propTypes = {
  match: PropTypes.shape({ path: PropTypes.string.isRequired }),
  isAuthenticated: PropTypes.bool,
  location: PropTypes.object
};

MainScreenComponent.defaultProps = {
  match: { path: '/' },
  isAuthenticated: false,
  location: null
};

export default MainScreenComponent;
