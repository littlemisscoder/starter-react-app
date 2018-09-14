import React from 'react';
import { shallow } from 'enzyme';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import sinon from 'sinon';

import HeaderComponent from './HeaderComponent';

jest.mock('react-router-dom', () => {
  return {
    Link: () => 'Link'
  };
});

describe('HeaderComponent is authenticated', () => {
  let sandbox;
  let wrapper;
  let props;
  const isAuthenticated = true;
  const username = 'username';
  let logoutUser;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
    logoutUser = sandbox.spy();
    props = {
      isAuthenticated,
      username,
      logoutUser,
      resetAuth: () => {}
    };
  });

  afterEach(() => {
    sandbox.restore();
    wrapper = null;
  });

  it('renders with one Navbar', () => {
    //When
    wrapper = shallow(<HeaderComponent {...props} />);

    //Then
    expect(wrapper.find(Navbar)).toHaveLength(1);
    expect(wrapper.find(Navbar).props().collapseOnSelect).toBeTruthy();
  });

  it('renders with one Navbar.Header', () => {
    //When
    wrapper = shallow(<HeaderComponent {...props} />);

    //Then
    expect(wrapper.find(Navbar.Header)).toHaveLength(1);
  });

  it('renders with one Navbar.Brand', () => {
    //When
    wrapper = shallow(<HeaderComponent {...props} />);

    //Then
    expect(wrapper.find(Navbar.Brand)).toHaveLength(1);
  });

  it('renders with one Navbar.Toggle', () => {
    //When
    wrapper = shallow(<HeaderComponent {...props} />);

    //Then
    expect(wrapper.find(Navbar.Toggle)).toHaveLength(1);
  });

  it('renders with one Link with to="/" and text Simple App', () => {
    //When
    wrapper = shallow(<HeaderComponent {...props} />);
    let component = wrapper.find('Link');

    //Then
    expect(component.props().to).toEqual('/');
    expect(component.props().children).toEqual('Simple App');
  });

  it('renders with one Navbar.Collapse', () => {
    //When
    wrapper = shallow(<HeaderComponent {...props} />);

    //Then
    expect(wrapper.find(Navbar.Collapse)).toHaveLength(1);
  });

  it('renders with one Navbar.Text', () => {
    //When
    wrapper = shallow(<HeaderComponent {...props} />);

    //Then
    expect(wrapper.find(Navbar.Text)).toHaveLength(1);
    expect(
      wrapper
        .find(Navbar.Text)
        .props()
        .children.toString()
    ).toEqual(`Signed in as: ${username}`);
  });

  it('renders with one Nav', () => {
    //When
    wrapper = shallow(<HeaderComponent {...props} />);

    //Then
    expect(wrapper.find(Nav)).toHaveLength(1);
    expect(wrapper.find(Nav).props().pullRight).toBeTruthy();
  });

  it('calls logoutUser on select NavItem with eventKey=logout', () => {
    //When
    wrapper = shallow(<HeaderComponent {...props} />);
    wrapper
      .find(Nav)
      .props()
      .onSelect('logout');

    //Then
    expect(logoutUser.calledOnce).toBeTruthy();
  });

  it('renders with one NavItem', () => {
    //When
    wrapper = shallow(<HeaderComponent {...props} />);

    //Then
    expect(wrapper.find(NavItem)).toHaveLength(1);
    expect(wrapper.find(NavItem).props().eventKey).toBe('logout');
    expect(wrapper.find(NavItem).props().children).toBe('Log Out');
  });
});

describe('HeaderComponent is not authenticated', () => {
  let sandbox;
  let wrapper;
  let props;
  const isAuthenticated = false;
  const username = 'username';
  let logoutUser;
  let resetAuth;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
    logoutUser = sandbox.spy();
    resetAuth = sandbox.spy();
    props = {
      isAuthenticated,
      username,
      logoutUser,
      resetAuth
    };
  });

  afterEach(() => {
    sandbox.restore();
    wrapper = null;
  });

  it('renders with one Navbar', () => {
    //When
    wrapper = shallow(<HeaderComponent {...props} />);

    //Then
    expect(wrapper.find(Navbar)).toHaveLength(1);
    expect(wrapper.find(Navbar).props().collapseOnSelect).toBeTruthy();
  });

  it('renders with one Navbar.Header', () => {
    //When
    wrapper = shallow(<HeaderComponent {...props} />);

    //Then
    expect(wrapper.find(Navbar.Header)).toHaveLength(1);
  });

  it('renders with one Navbar.Brand', () => {
    //When
    wrapper = shallow(<HeaderComponent {...props} />);

    //Then
    expect(wrapper.find(Navbar.Brand)).toHaveLength(1);
  });

  it('renders with one Navbar.Toggle', () => {
    //When
    wrapper = shallow(<HeaderComponent {...props} />);

    //Then
    expect(wrapper.find(Navbar.Toggle)).toHaveLength(1);
  });

  it('renders with one Link with to="/" and text Simple App', () => {
    //When
    wrapper = shallow(<HeaderComponent {...props} />);
    let component = wrapper.find('Link');

    //Then
    expect(component.props().to).toEqual('/');
    expect(component.props().children).toEqual('Simple App');
  });

  it('renders with one Navbar.Collapse', () => {
    //When
    wrapper = shallow(<HeaderComponent {...props} />);

    //Then
    expect(wrapper.find(Navbar.Collapse)).toHaveLength(1);
  });

  it('renders with one Nav', () => {
    //When
    wrapper = shallow(<HeaderComponent {...props} />);

    //Then
    expect(wrapper.find(Nav)).toHaveLength(1);
    expect(wrapper.find(Nav).props().pullRight).toBeTruthy();
  });

  it('renders with one LinkContainer with to=/login', () => {
    //When
    wrapper = shallow(<HeaderComponent {...props} />);
    var component = wrapper
      .find(LinkContainer)
      .filterWhere(n => n.props().to === '/login');

    //Then
    expect(component).toHaveLength(1);
  });

  it('renders with one LinkContainer with to=/register', () => {
    //When
    wrapper = shallow(<HeaderComponent {...props} />);
    var component = wrapper
      .find(LinkContainer)
      .filterWhere(n => n.props().to === '/register');

    //Then
    expect(component).toHaveLength(1);
  });

  it('should call resetAuth when navigate to=/login', () => {
    //When
    wrapper = shallow(<HeaderComponent {...props} />);
    var component = wrapper
      .find(LinkContainer)
      .filterWhere(n => n.props().to === '/login');
    component.props().onClick();

    //Then
    expect(resetAuth.calledOnce).toBeTruthy();
  });

  it('should call resetAuth when navigate to=/register', () => {
    //When
    wrapper = shallow(<HeaderComponent {...props} />);
    var component = wrapper
      .find(LinkContainer)
      .filterWhere(n => n.props().to === '/register');
    component.props().onClick();

    //Then
    expect(resetAuth.calledOnce).toBeTruthy();
  });

  it('renders with one NavItem with text Log In', () => {
    //When
    wrapper = shallow(<HeaderComponent {...props} />);
    var component = wrapper
      .find(NavItem)
      .filterWhere(n => n.props().children === 'Log In');

    //Then
    expect(component).toHaveLength(1);
  });

  it('renders with one NavItem with text Register', () => {
    //When
    wrapper = shallow(<HeaderComponent {...props} />);
    var component = wrapper
      .find(NavItem)
      .filterWhere(n => n.props().children === 'Register');

    //Then
    expect(component).toHaveLength(1);
  });
});
