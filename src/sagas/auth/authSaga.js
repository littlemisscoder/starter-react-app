import {
  INIT_TOKEN,
  LOGIN_USER,
  REG_USER,
  LOGOUT_USER
} from '../../reducers/auth/authConstants';
import {
  loginFail,
  loginSuccess,
  registerFail,
  registerSuccess,
  resetAuth
} from '../../reducers/auth/authActions';
import { getUser } from '../../reducers/user/userActions';
import { LocalStorageService } from '../../services';
import { AuthService } from '../../services/api';
import { call, takeLatest, put } from 'redux-saga/effects';
import { NetworkError } from '../../services/api/errorMessages';

export function* retrieveTokenFromLocalStorage() {
  var token = LocalStorageService.getToken();
  if (token == null) {
    return;
  }
  try {
    const { data } = yield call(AuthService.verifyToken, token);
    LocalStorageService.setToken(token);
    yield put(loginSuccess(token, data.username));
    yield put(getUser());
  } catch (error) {
    LocalStorageService.setToken(null);
    yield put(loginFail());
  }
}

export function* watchRetrieveToken() {
  yield takeLatest(INIT_TOKEN, retrieveTokenFromLocalStorage);
}

export function* login(action) {
  try {
    yield put(loginFail());

    var { data } = yield call(AuthService.login, action.payload);
    var token = data == null ? null : data.token;

    LocalStorageService.setToken(token);
    yield put(loginSuccess(token, data.username));
    yield put(getUser());
  } catch (error) {
    LocalStorageService.setToken(null);
    if (error != null && error.message != null) {
      yield put(loginFail(error.message));
    } else {
      yield put(loginFail(NetworkError));
    }
  }
}

export function* watchLogin() {
  yield takeLatest(LOGIN_USER, login);
}

export function* register(action) {
  try {
    yield put(registerFail());

    const { data } = yield call(AuthService.register, action.payload);
    let token = data == null ? null : data.token;

    LocalStorageService.setToken(token);
    yield put(registerSuccess(token, data.username));
    yield put(getUser());
  } catch (error) {
    LocalStorageService.setToken(null);
    if (error != null && error.message != null) {
      yield put(registerFail(error.message));
    } else {
      yield put(registerFail(NetworkError));
    }
  }
}

export function* watchRegister() {
  yield takeLatest(REG_USER, register);
}

export function* logout() {
  LocalStorageService.setToken(null);
  yield put(resetAuth());
}

export function* watchLogout() {
  yield takeLatest(LOGOUT_USER, logout);
}
