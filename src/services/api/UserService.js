import { checkStatus } from './checkStatus';

const API_URL = process.env.REACT_APP_API_URL;

function getUser(token) {
  return fetch(`${API_URL}user`, {
    method: 'get',
    headers: new Headers({
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'x-access-token': token
    }),
    body: null,
    mode: 'cors'
  }).then(checkStatus);
}

const UserService = { getUser };
export default UserService;
