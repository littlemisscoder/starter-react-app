import React from 'react';
import configureStore from 'redux-mock-store';
import { shallow } from 'enzyme';

import Header from './Header';
import HeaderComponent from './HeaderComponent';

describe('Header ', () => {
  const mockStore = configureStore();
  const isAuthenticated = true;
  const username = 'username';
  const initialState = {
    auth: {
      isAuthenticated,
      username
    }
  };
  let wrapper;
  let store;

  beforeEach(() => {
    store = mockStore(initialState);
    wrapper = shallow(<Header store={store} />);
  });

  afterEach(() => {
    wrapper = null;
  });

  it('renders HeaderComponent', () => {
    expect(wrapper.find(HeaderComponent)).toHaveLength(1);
  });

  it('renders HeaderComponent with correct props.isAuthenticated', () => {
    let props = wrapper.find(HeaderComponent).props();
    expect(props.isAuthenticated).toBe(isAuthenticated);
  });

  it('renders HeaderComponent with correct props.username', () => {
    let props = wrapper.find(HeaderComponent).props();
    expect(props.username).toBe(username);
  });
});
