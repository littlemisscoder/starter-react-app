import React from 'react';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';

import '../mocks/react-router-dom';
import ConnectedApp, { App } from './App';
import { MainScreen, LoginScreen, RegisterScreen } from './screens';

jest.mock('./components/navigation/header/Header', () => 'Header');

describe('Connect(App) component ', () => {
  const mockStore = configureStore();
  const initialState = {};
  let store;
  let wrapper;

  beforeEach(() => {
    store = mockStore(initialState);
    wrapper = shallow(<ConnectedApp store={store} />);
  });

  afterEach(() => {
    wrapper = null;
  });

  it('renders App', () => {
    expect(wrapper.find(App)).toHaveLength(1);
  });
});

describe('App component ', () => {
  let sandbox;
  let initToken;
  let wrapper;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
    initToken = sandbox.spy();
    let props = {
      initToken
    };
    wrapper = shallow(<App {...props} />);
  });

  afterEach(() => {
    sandbox.restore();
    wrapper = null;
  });

  it('renders with one Router', () => {
    expect(wrapper.find('BrowserRouter')).toHaveLength(1);
  });

  it('renders with one Header', () => {
    expect(wrapper.find('Header')).toHaveLength(1);
  });

  it('renders with three Routes', () => {
    expect(wrapper.find('Route')).toHaveLength(3);
  });

  it('renders with MainScreen for path /', () => {
    //Given
    const expectedProps = {
      exact: true,
      path: '/',
      component: MainScreen
    };

    //When
    const component = wrapper
      .find('Route')
      .filterWhere(n => n.props().path === '/')
      .getElements();

    //Then
    expect(component).toHaveLength(1);
    expect(component[0].props).toEqual(expectedProps);
  });

  it('renders with LoginScreen for path /login', () => {
    //Given
    const expectedProps = {
      path: '/login',
      component: LoginScreen
    };

    //When
    const component = wrapper
      .find('Route')
      .filterWhere(n => n.props().path === '/login')
      .getElements();

    //Then
    expect(component).toHaveLength(1);
    expect(component[0].props).toEqual(expectedProps);
  });

  it('renders with RegisterScreen for path /register', () => {
    //Given
    const expectedProps = {
      path: '/register',
      component: RegisterScreen
    };

    //When
    const component = wrapper
      .find('Route')
      .filterWhere(n => n.props().path === '/register')
      .getElements();

    //Then
    expect(component).toHaveLength(1);
    expect(component[0].props).toEqual(expectedProps);
  });

  it('constructor calls props.initToken once', () => {
    expect(initToken.calledOnce).toBeTruthy();
  });
});
