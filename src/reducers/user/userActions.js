import {
  GET_USER,
  SET_USER,
  SET_USER_SERVICE_FAIL,
  SET_USER_SERVICE_SUCCESS
} from './userConstants';

export function getUser() {
  return {
    type: GET_USER
  };
}

export function setUser(user) {
  return {
    type: SET_USER,
    payload: {
      user
    }
  };
}

export function setUserServiceFailure(error) {
  return {
    type: SET_USER_SERVICE_FAIL,
    payload: {
      error
    }
  };
}

export function setUserServiceSuccess() {
  return {
    type: SET_USER_SERVICE_SUCCESS
  };
}
