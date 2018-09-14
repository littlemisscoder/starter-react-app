import React from 'react';
import configureStore from 'redux-mock-store';
import { shallow } from 'enzyme';
import RegisterScreen from './RegisterScreen';
import RegisterScreenComponent from './RegisterScreenComponent';

describe('RegisterScreen ', () => {
  const mockStore = configureStore();
  const isAuthenticated = true;
  const registerError = 'register';
  const initialState = {
    auth: {
      isAuthenticated,
      registerError
    }
  };

  let store;
  let wrapper;

  beforeEach(() => {
    store = mockStore(initialState);
    wrapper = shallow(<RegisterScreen store={store} />);
  });

  afterEach(() => {
    wrapper = null;
  });

  it('renders RegisterScreenComponent', () => {
    expect(wrapper.find(RegisterScreenComponent)).toHaveLength(1);
  });

  it('renders RegisterScreenComponent with correct props.isAuthenticated', () => {
    let props = wrapper.find(RegisterScreenComponent).props();
    expect(props.isAuthenticated).toBe(isAuthenticated);
  });

  it('renders RegisterScreenComponent with correct props.registerError', () => {
    let props = wrapper.find(RegisterScreenComponent).props();
    expect(props.registerError).toBe(registerError);
  });
});
