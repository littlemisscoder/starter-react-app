import { createReducer } from '../../common/utils/reducerUtils';
import {
  SET_USER,
  SET_USER_SERVICE_FAIL,
  SET_USER_SERVICE_SUCCESS
} from './userConstants';

const initialState = {
  user: null,
  hasErrors: false,
  error: null
};

export function setUser(state, payload) {
  const { user } = payload;
  return {
    ...state,
    user
  };
}

export function setUserServiceFailure(state, payload) {
  const { error } = payload;
  return {
    ...state,
    hasErrors: true,
    error
  };
}

export function setUserServiceSuccess(state) {
  return {
    ...state,
    hasErrors: false,
    error: null
  };
}

const handlers = {
  [SET_USER]: setUser,
  [SET_USER_SERVICE_FAIL]: setUserServiceFailure,
  [SET_USER_SERVICE_SUCCESS]: setUserServiceSuccess
};

export default createReducer(initialState, handlers);
