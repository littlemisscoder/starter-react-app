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

export function initToken() {
  return {
    type: INIT_TOKEN
  };
}

export function setToken(token) {
  return {
    type: SET_TOKEN,
    payload: {
      token
    }
  };
}

export function loginUser(username, password) {
  var authCredentials = {
    username,
    password
  };
  return {
    type: LOGIN_USER,
    payload: authCredentials
  };
}

export function loginFail(loginError = '') {
  return {
    type: LOGIN_FAIL,
    payload: {
      loginError
    }
  };
}

export function loginSuccess(token, username) {
  return {
    type: LOGIN_SUCCESS,
    payload: {
      token,
      username
    }
  };
}

export function registerUser(username, password) {
  var authCredentials = {
    username,
    password
  };
  return {
    type: REG_USER,
    payload: authCredentials
  };
}

export function registerFail(registerError = '') {
  return {
    type: REG_FAIL,
    payload: {
      registerError
    }
  };
}

export function registerSuccess(token, username) {
  return {
    type: REG_SUCCESS,
    payload: {
      token,
      username
    }
  };
}

export function logoutUser() {
  return {
    type: LOGOUT_USER
  };
}

export function resetAuth() {
  return {
    type: RESET_AUTH
  };
}
