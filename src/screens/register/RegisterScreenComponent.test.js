import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';

import RegisterScreenComponent from './RegisterScreenComponent';

jest.mock('react-bootstrap', () => {
  return {
    FormGroup: () => 'FormGroup',
    FormControl: () => 'FormControl',
    ControlLabel: () => 'ControlLabel',
    PageHeader: () => 'PageHeader',
    Alert: () => 'Alert',
    Button: () => 'Button'
  };
});

jest.mock('react-router-dom', () => {
  return {
    Redirect: () => 'Redirect',
    Link: () => 'Link'
  };
});

describe('RegisterScreenComponent is authenticated ', () => {
  let wrapper;
  let props;
  const isAuthenticated = true;
  const registerError = '';
  const location = {
    state: {
      from: { pathname: '/home' }
    }
  };

  beforeEach(() => {
    props = {
      isAuthenticated,
      registerError,
      location,
      registerUser: () => {},
      resetAuth: () => {}
    };
  });

  afterEach(() => {
    wrapper = null;
  });

  it('renders with one Redirect', () => {
    //When
    wrapper = shallow(<RegisterScreenComponent {...props} />);

    //Then
    expect(wrapper.find('Redirect')).toHaveLength(1);
  });

  it('renders with one Redirect with props.to=location.state.from', () => {
    //When
    wrapper = shallow(<RegisterScreenComponent {...props} />);

    //Then
    expect(wrapper.find('Redirect').props().to).toBe(location.state.from);
  });

  it('renders with one Redirect with props.to=/ when last known state is undefined', () => {
    //Given
    props.location.state = null;

    //When
    wrapper = shallow(<RegisterScreenComponent {...props} />);

    //Then
    expect(wrapper.find('Redirect').props().to).toEqual({ pathname: '/' });
  });
});

describe('RegisterScreenComponent is not authenticated ', () => {
  let sandbox;
  let wrapper;
  let props;
  const isAuthenticated = false;
  const registerError = null;
  const location = {
    state: {
      from: { pathname: '/home' }
    }
  };
  let registerUser;
  let resetAuth;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
    registerUser = sandbox.spy();
    resetAuth = sandbox.spy();
    props = {
      isAuthenticated,
      registerError,
      location,
      registerUser,
      resetAuth
    };
  });

  afterEach(() => {
    sandbox.restore();
    wrapper = null;
  });

  it('initialized with correct state', () => {
    //Given
    const expectedState = {
      username: '',
      password: '',
      isLoading: false
    };

    //When
    wrapper = shallow(<RegisterScreenComponent {...props} />);

    //Then
    expect(wrapper.state()).toEqual(expectedState);
  });

  it('renders with one PageHeader', () => {
    //When
    wrapper = shallow(<RegisterScreenComponent {...props} />);

    //Then
    expect(wrapper.find('PageHeader')).toHaveLength(1);
  });

  it('renders with one PageHeader having content "Create Account"', () => {
    //When
    wrapper = shallow(<RegisterScreenComponent {...props} />);

    //Then
    expect(wrapper.find('PageHeader').props().children).toBe('Create Account');
  });

  it('renders without Alert when registerError is null', () => {
    //When
    wrapper = shallow(<RegisterScreenComponent {...props} />);

    //Then
    expect(wrapper.find('Alert')).toHaveLength(0);
  });

  it('renders without Alert when registerError is empty string', () => {
    //Given
    props.registerError = '';

    //When
    wrapper = shallow(<RegisterScreenComponent {...props} />);

    //Then
    expect(wrapper.find('Alert')).toHaveLength(0);
  });

  it('renders one Alert with error message when registerError has length > 0', () => {
    //Given
    props.registerError = 'Error';

    //When
    wrapper = shallow(<RegisterScreenComponent {...props} />);

    //Then
    expect(wrapper.find('Alert')).toHaveLength(1);
    expect(wrapper.find('Alert').props().children).toEqual(props.registerError);
  });

  it('renders one form', () => {
    //When
    wrapper = shallow(<RegisterScreenComponent {...props} />);

    //Then
    expect(wrapper.find('form')).toHaveLength(1);
  });

  it('renders FormControl with type text', () => {
    //When
    wrapper = shallow(<RegisterScreenComponent {...props} />);
    let component = wrapper
      .find('FormControl')
      .filterWhere(n => n.props().type === 'text');

    //Then
    expect(component).toHaveLength(1);
  });

  it('should update state.username when username input changes', () => {
    //Given
    let newUsername = 'new_username';
    let changeEvent = {
      target: {
        value: newUsername
      }
    };

    //When
    wrapper = shallow(<RegisterScreenComponent {...props} />);
    let component = wrapper
      .find('FormControl')
      .filterWhere(n => n.props().type === 'text');
    component.props().onChange(changeEvent);

    //Then
    expect(wrapper.state().username).toEqual(newUsername);
  });

  it('renders FormControl with type password', () => {
    //When
    wrapper = shallow(<RegisterScreenComponent {...props} />);
    let component = wrapper
      .find('FormControl')
      .filterWhere(n => n.props().type === 'password');

    //Then
    expect(component).toHaveLength(1);
  });

  it('should update state.password when password input changes', () => {
    //Given
    let newPassword = 'new_password';
    let changeEvent = {
      target: {
        value: newPassword
      }
    };

    //When
    wrapper = shallow(<RegisterScreenComponent {...props} />);
    let component = wrapper
      .find('FormControl')
      .filterWhere(n => n.props().type === 'password');
    component.props().onChange(changeEvent);

    //Then
    expect(wrapper.state().password).toEqual(newPassword);
  });

  it('renders Button of type submit', () => {
    //When
    wrapper = shallow(<RegisterScreenComponent {...props} />);
    let component = wrapper
      .find('Button')
      .filterWhere(n => n.props().type === 'submit');

    //Then
    expect(component).toHaveLength(1);
  });

  it('renders enabled Button of type submit when state.isLoading=false', () => {
    //Given
    const state = {
      username: 'username',
      password: 'password',
      isLoading: false
    };

    //When
    wrapper = shallow(<RegisterScreenComponent {...props} />);
    wrapper.setState(state);
    let component = wrapper
      .find('Button')
      .filterWhere(n => n.props().type === 'submit');

    //Then
    expect(component.props().disabled).toBeFalsy();
  });

  it('renders disabled Button of type submit when state.isLoading=true', () => {
    //Given
    const state = {
      username: 'username',
      password: 'password',
      isLoading: true
    };

    //When
    wrapper = shallow(<RegisterScreenComponent {...props} />);
    wrapper.setState(state);
    let component = wrapper
      .find('Button')
      .filterWhere(n => n.props().type === 'submit');

    //Then
    expect(component.props().disabled).toBeTruthy();
  });

  it('renders disabled Button of type submit when username and password inputs are empty', () => {
    //Given
    const state = {
      username: '',
      password: '',
      isLoading: false
    };

    //When
    wrapper = shallow(<RegisterScreenComponent {...props} />);
    wrapper.setState(state);
    let component = wrapper
      .find('Button')
      .filterWhere(n => n.props().type === 'submit');

    //Then
    expect(component.props().disabled).toBeTruthy();
  });

  it('should not change isLoading when username and password are empty on submit', () => {
    //When
    wrapper = shallow(<RegisterScreenComponent {...props} />);
    let component = wrapper
      .find('Button')
      .filterWhere(n => n.props().type === 'submit');
    component.props().onClick();

    //Then
    expect(wrapper.instance().state.isLoading).toEqual(false);
  });

  it('should update state.isLoading=true and call registerUser on submit', () => {
    //Given
    const state = {
      username: 'username',
      password: 'password',
      isLoading: false
    };

    //When
    wrapper = shallow(<RegisterScreenComponent {...props} />);
    wrapper.setState(state);
    let component = wrapper
      .find('Button')
      .filterWhere(n => n.props().type === 'submit');
    component.props().onClick();

    //Then
    expect(wrapper.instance().state.isLoading).toEqual(true);
    expect(registerUser.calledOnce).toBeTruthy();
  });

  it('renders Link with to=/login', () => {
    //When
    wrapper = shallow(<RegisterScreenComponent {...props} />);

    //Then
    expect(wrapper.find('Link')).toHaveLength(1);
    expect(wrapper.find('Link').props().to).toEqual('/login');
  });

  it('should call resetAuth onClick Link', () => {
    //When
    wrapper = shallow(<RegisterScreenComponent {...props} />);
    wrapper
      .find('Link')
      .props()
      .onClick();

    //Then
    expect(resetAuth.calledOnce).toBeTruthy();
  });

  it('getDerivedStateFromProps should set isLoading=false when registerError changes', () => {
    //Given
    const updateProps = {
      registerError: 'New Error'
    };
    const state = {
      username: 'username',
      password: 'password',
      isLoading: true
    };

    //When
    wrapper = shallow(<RegisterScreenComponent {...props} />);
    wrapper.setState(state);
    wrapper.setProps(updateProps);

    //Then
    expect(wrapper.instance().state.isLoading).toBeFalsy();
  });

  it('getDerivedStateFromProps should make no changes when registerError is the same', () => {
    //Given
    const updateProps = {
      registerError: null
    };
    const state = {
      username: 'username',
      password: 'password',
      isLoading: true
    };

    //When
    wrapper = shallow(<RegisterScreenComponent {...props} />);
    wrapper.setState(state);
    wrapper.setProps(updateProps);

    //Then
    expect(wrapper.instance().state.isLoading).toBeTruthy();
  });
});
