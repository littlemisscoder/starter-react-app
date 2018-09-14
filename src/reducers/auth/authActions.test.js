import {
  initToken,
  setToken,
  loginUser,
  loginFail,
  loginSuccess,
  registerUser,
  registerFail,
  registerSuccess,
  logoutUser,
  resetAuth
} from './authActions';
import {
  INIT_TOKEN,
  SET_TOKEN,
  LOGIN_USER,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  REG_USER,
  REG_FAIL,
  REG_SUCCESS,
  LOGOUT_USER,
  RESET_AUTH
} from './authConstants';

describe('authActions ', () => {
  it('initToken should return INIT_TOKEN', () => {
    //Given
    let expectedAction = {
      type: INIT_TOKEN
    };

    //When
    let result = initToken();

    //Then
    expect(result).toEqual(expectedAction);
  });

  it('setToken should return SET_TOKEN', () => {
    //Given
    let token = 'token';
    let expectedAction = {
      type: SET_TOKEN,
      payload: {
        token
      }
    };

    //When
    let result = setToken(token);

    //Then
    expect(result).toEqual(expectedAction);
  });

  it('loginUser should return LOGIN_USER', () => {
    //Given
    let username = 'username';
    let password = 'password';
    let expectedAction = {
      type: LOGIN_USER,
      payload: {
        username,
        password
      }
    };

    //When
    let result = loginUser(username, password);

    //Then
    expect(result).toEqual(expectedAction);
  });

  it('loginFail should return LOGIN_FAIL', () => {
    //Given
    let loginError = 'loginError';
    let expectedAction = {
      type: LOGIN_FAIL,
      payload: {
        loginError
      }
    };

    //When
    let result = loginFail(loginError);

    //Then
    expect(result).toEqual(expectedAction);
  });

  it('loginFail should return LOGIN_FAIL when loginError is undefined', () => {
    //Given
    let loginError = undefined;
    let expectedAction = {
      type: LOGIN_FAIL,
      payload: {
        loginError: ''
      }
    };

    //When
    let result = loginFail(loginError);

    //Then
    expect(result).toEqual(expectedAction);
  });

  it('loginSuccess should return LOGIN_SUCCESS', () => {
    //Given
    let token = 'token';
    let username = 'username';

    let expectedAction = {
      type: LOGIN_SUCCESS,
      payload: {
        token,
        username
      }
    };

    //When
    let result = loginSuccess(token, username);

    //Then
    expect(result).toEqual(expectedAction);
  });

  it('registerUser should return REG_USER', () => {
    //Given
    let username = 'username';
    let password = 'password';
    let expectedAction = {
      type: REG_USER,
      payload: {
        username,
        password
      }
    };

    //When
    let result = registerUser(username, password);

    //Then
    expect(result).toEqual(expectedAction);
  });

  it('registerFail should return LOGIN_FAIL', () => {
    //Given
    let registerError = 'registerError';
    let expectedAction = {
      type: REG_FAIL,
      payload: {
        registerError
      }
    };

    //When
    let result = registerFail(registerError);

    //Then
    expect(result).toEqual(expectedAction);
  });

  it('registerFail should return LOGIN_FAIL when registerError is undefined', () => {
    //Given
    let registerError = undefined;
    let expectedAction = {
      type: REG_FAIL,
      payload: {
        registerError: ''
      }
    };

    //When
    let result = registerFail(registerError);

    //Then
    expect(result).toEqual(expectedAction);
  });

  it('registerSuccess should return LOGIN_SUCCESS', () => {
    //Given
    let token = 'token';
    let username = 'username';

    let expectedAction = {
      type: REG_SUCCESS,
      payload: {
        token,
        username
      }
    };

    //When
    let result = registerSuccess(token, username);

    //Then
    expect(result).toEqual(expectedAction);
  });

  it('logoutUser should return LOGOUT_USER', () => {
    //Given
    let expectedAction = {
      type: LOGOUT_USER
    };

    //When
    let result = logoutUser();

    //Then
    expect(result).toEqual(expectedAction);
  });

  it('resetAuth should return RESET_AUTH', () => {
    //Given
    let expectedAction = {
      type: RESET_AUTH
    };

    //When
    let result = resetAuth();

    //Then
    expect(result).toEqual(expectedAction);
  });
});
