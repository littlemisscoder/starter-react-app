import { call, takeLatest, put, select } from 'redux-saga/effects';

import { GET_USER } from '../../reducers/user/userConstants';
import {
  setUser,
  setUserServiceFailure,
  setUserServiceSuccess
} from '../../reducers/user/userActions';
import { UserService } from '../../services/api';

export const getToken = state => state.auth.token;

export function* getUser() {
  try {
    const token = yield select(getToken);
    const { data } = yield call(UserService.getUser, token);
    yield put(setUserServiceSuccess());
    yield put(setUser(data));
  } catch (error) {
    yield put(setUserServiceFailure(error));
  }
}

export function* watchGetUser() {
  yield takeLatest(GET_USER, getUser);
}
