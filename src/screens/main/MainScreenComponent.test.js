import React from 'react';
import { shallow } from 'enzyme';
import MainScreenComponent from './MainScreenComponent';

jest.mock('react-router-dom', () => {
  return {
    Redirect: () => 'Redirect',
    Route: () => 'Route'
  };
});

jest.mock('./DefaultScreen', () => {
  return {
    DefaultScreen: () => 'DefaultScreen'
  };
});

describe('MainScreenComponent is authenticated', () => {
  let wrapper;
  let props;
  const match = { path: '/main' };
  const isAuthenticated = true;
  const location = {
    state: {
      from: { pathname: '/home' }
    }
  };

  beforeEach(() => {
    props = {
      match,
      isAuthenticated,
      location
    };
  });

  afterEach(() => {
    wrapper = null;
  });

  it('renders with one Route', () => {
    //When
    wrapper = shallow(<MainScreenComponent {...props} />);

    //Then
    expect(wrapper.find('Route')).toHaveLength(1);
  });

  it('renders with one Route with component=DefaultScreen', () => {
    //When
    wrapper = shallow(<MainScreenComponent {...props} />);
    let routeComponent = wrapper.find('Route');

    //Then
    expect(routeComponent.props().component()).toEqual('DefaultScreen');
  });

  it('renders with one Route with path=match.path', () => {
    //When
    wrapper = shallow(<MainScreenComponent {...props} />);
    let routeComponent = wrapper.find('Route');

    //Then
    expect(routeComponent.props().path).toBe(match.path);
  });
});

describe('MainScreenComponent is not authenticated', () => {
  let wrapper;
  let props;
  const isAuthenticated = false;
  const loginError = '';
  const location = {
    state: {
      from: { pathname: '/home' }
    }
  };

  beforeEach(() => {
    props = {
      isAuthenticated,
      loginError,
      location
    };
  });

  afterEach(() => {
    wrapper = null;
  });

  it('renders with one Redirect', () => {
    //When
    wrapper = shallow(<MainScreenComponent {...props} />);

    //Then
    expect(wrapper.find('Redirect')).toHaveLength(1);
  });

  it('renders with one Redirect to login', () => {
    //Given
    let expectedTo = {
      pathname: '/login',
      state: { from: location }
    };

    //When
    wrapper = shallow(<MainScreenComponent {...props} />);

    //Then
    expect(wrapper.find('Redirect').props().to).toEqual(expectedTo);
  });
});
