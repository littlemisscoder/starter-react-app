import { createReducer } from '../../common/utils/reducerUtils';
import {
  SET_TOKEN,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  REG_FAIL,
  REG_SUCCESS,
  RESET_AUTH
} from './authConstants';

const initialState = {
  isAuthenticated: null,
  token: null,
  username: '',
  loginError: '',
  registerError: ''
};

export function setToken(state, payload) {
  const { token, username } = payload;
  return {
    ...state,
    token,
    username
  };
}

export function loginFail(state, payload) {
  const { loginError } = payload;
  return {
    ...state,
    isAuthenticated: false,
    token: null,
    username: '',
    loginError,
    registerError: ''
  };
}

export function loginSuccess(state, payload) {
  const { token, username } = payload;
  return {
    ...state,
    isAuthenticated: true,
    token,
    username,
    loginError: '',
    registerError: ''
  };
}

export function registerFail(state, payload) {
  const { registerError } = payload;
  return {
    ...state,
    isAuthenticated: false,
    token: null,
    username: '',
    loginError: '',
    registerError
  };
}

export function registerSuccess(state, payload) {
  const { token, username } = payload;
  return {
    ...state,
    isAuthenticated: true,
    token,
    username,
    loginError: '',
    registerError: ''
  };
}

export function resetAuth(state) {
  return {
    ...state,
    isAuthenticated: false,
    token: null,
    username: '',
    loginError: '',
    registerError: ''
  };
}

const handlers = {
  [SET_TOKEN]: setToken,
  [LOGIN_FAIL]: loginFail,
  [LOGIN_SUCCESS]: loginSuccess,
  [REG_FAIL]: registerFail,
  [REG_SUCCESS]: registerSuccess,
  [RESET_AUTH]: resetAuth
};

export default createReducer(initialState, handlers);
