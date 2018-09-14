import sinon from 'sinon';

import * as ReducerUtilsModule from '../../common/utils/reducerUtils';
import {
  SET_TOKEN,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  REG_FAIL,
  REG_SUCCESS,
  RESET_AUTH
} from './authConstants';

describe('authReducer ', () => {
  let sandbox;
  let initialState;
  let handlers;
  const createdReducer = () => {};

  beforeEach(() => {
    sandbox = sinon.createSandbox();
    sandbox.stub(ReducerUtilsModule, 'createReducer').callsFake((s, h) => {
      initialState = s;
      handlers = h;
      return createdReducer;
    });
    require('./authReducer');
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('should return the initialState', () => {
    //Given
    const expectedInitialState = {
      isAuthenticated: null,
      token: null,
      username: '',
      loginError: '',
      registerError: ''
    };

    //Then
    expect(initialState).toEqual(expectedInitialState);
  });

  it('SET_TOKEN should update token and username state', () => {
    //Given
    let payload = {
      token: 'token',
      username: 'username'
    };
    let handler = handlers[SET_TOKEN];
    const resultState = {
      ...initialState,
      token: payload.token,
      username: payload.username
    };

    //When
    const result = handler(initialState, payload);

    //Then
    expect(result).toEqual(resultState);
  });

  it('LOGIN_FAIL should update isAuthenticated=false, token=null, username="", registerError="", and loginError state', () => {
    //Given
    let payload = {
      loginError: 'loginError'
    };
    let handler = handlers[LOGIN_FAIL];
    const resultState = {
      ...initialState,
      isAuthenticated: false,
      token: null,
      username: '',
      loginError: payload.loginError,
      registerError: ''
    };

    //When
    const result = handler(initialState, payload);

    //Then
    expect(result).toEqual(resultState);
  });

  it('LOGIN_SUCCESS should update isAuthenticated=true, token, username, loginError="", registerError="" state', () => {
    //Given
    let payload = {
      token: 'token',
      username: 'username'
    };
    let handler = handlers[LOGIN_SUCCESS];
    const resultState = {
      ...initialState,
      isAuthenticated: true,
      token: payload.token,
      username: payload.username,
      loginError: '',
      registerError: ''
    };

    //When
    const result = handler(initialState, payload);

    //Then
    expect(result).toEqual(resultState);
  });

  it('REG_FAIL should update isAuthenticated=false, token=null, username="", registerError, loginError="" state', () => {
    //Given
    let payload = {
      registerError: 'registerError'
    };
    let handler = handlers[REG_FAIL];
    const resultState = {
      ...initialState,
      isAuthenticated: false,
      token: null,
      username: '',
      loginError: '',
      registerError: payload.registerError
    };

    //When
    const result = handler(initialState, payload);

    //Then
    expect(result).toEqual(resultState);
  });

  it('REG_SUCCESS should update isAuthenticated=true, token, username, loginError="", registerError="" state', () => {
    //Given
    let payload = {
      token: 'token',
      username: 'username'
    };
    let handler = handlers[REG_SUCCESS];
    const resultState = {
      ...initialState,
      isAuthenticated: true,
      token: payload.token,
      username: payload.username,
      loginError: '',
      registerError: ''
    };

    //When
    const result = handler(initialState, payload);

    //Then
    expect(result).toEqual(resultState);
  });

  it('RESET_AUTH should update isAuthenticated=false, token=null, username="", loginError="", registerError="" state', () => {
    //Given
    let handler = handlers[RESET_AUTH];
    const resultState = {
      ...initialState,
      isAuthenticated: false,
      token: null,
      username: '',
      loginError: '',
      registerError: ''
    };

    //When
    const result = handler(initialState);

    //Then
    expect(result).toEqual(resultState);
  });
});
