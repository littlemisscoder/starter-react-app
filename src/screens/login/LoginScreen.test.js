import React from 'react';
import configureStore from 'redux-mock-store';
import { shallow } from 'enzyme';
import LoginScreen from './LoginScreen';
import LoginScreenComponent from './LoginScreenComponent';

describe('LoginScreen ', () => {
  const mockStore = configureStore();
  const isAuthenticated = true;
  const loginError = 'login';
  const initialState = {
    auth: {
      isAuthenticated,
      loginError
    }
  };

  let store;
  let wrapper;

  beforeEach(() => {
    store = mockStore(initialState);
    wrapper = shallow(<LoginScreen store={store} />);
  });

  afterEach(() => {
    wrapper = null;
  });

  it('renders LoginScreenComponent', () => {
    expect(wrapper.find(LoginScreenComponent)).toHaveLength(1);
  });

  it('renders LoginScreenComponent with correct props.isAuthenticated', () => {
    let props = wrapper.find(LoginScreenComponent).props();
    expect(props.isAuthenticated).toBe(isAuthenticated);
  });

  it('renders LoginScreenComponent with correct props.loginError', () => {
    let props = wrapper.find(LoginScreenComponent).props();
    expect(props.loginError).toBe(loginError);
  });
});
