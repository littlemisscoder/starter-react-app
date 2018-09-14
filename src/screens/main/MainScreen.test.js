import React from 'react';
import configureStore from 'redux-mock-store';
import { shallow } from 'enzyme';
import MainScreen from './MainScreen';
import MainScreenComponent from './MainScreenComponent';

describe('MainScreen ', () => {
  const mockStore = configureStore();
  const isAuthenticated = true;
  const initialState = {
    auth: {
      isAuthenticated
    }
  };

  let store;
  let wrapper;

  beforeEach(() => {
    store = mockStore(initialState);
    wrapper = shallow(<MainScreen store={store} />);
  });

  afterEach(() => {
    wrapper = null;
  });

  it('renders MainScreenComponent', () => {
    expect(wrapper.find(MainScreenComponent)).toHaveLength(1);
  });

  it('renders MainScreenComponent with correct props.isAuthenticated', () => {
    let props = wrapper.find(MainScreenComponent).props();
    expect(props.isAuthenticated).toBe(isAuthenticated);
  });
});
