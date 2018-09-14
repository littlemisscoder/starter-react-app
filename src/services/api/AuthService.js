import { checkStatus } from './checkStatus';

const API_URL = process.env.REACT_APP_API_URL;

function verifyToken(token) {
  return fetch(`${API_URL}verifyToken`, {
    method: 'post',
    headers: new Headers({
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'x-access-token': token
    }),
    body: null,
    mode: 'cors'
  }).then(checkStatus);
}

function login(authCredentials) {
  return fetch(`${API_URL}login`, {
    method: 'post',
    headers: new Headers({
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }),
    body: JSON.stringify(authCredentials),
    mode: 'cors'
  }).then(checkStatus);
}

function register(authCredentials) {
  return fetch(`${API_URL}register`, {
    method: 'post',
    headers: new Headers({
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }),
    body: JSON.stringify(authCredentials),
    mode: 'cors'
  }).then(checkStatus);
}

const AuthService = { verifyToken, login, register };
export default AuthService;
