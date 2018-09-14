import {
  watchRetrieveToken,
  watchLogin,
  watchRegister,
  watchLogout
} from './auth/authSaga';
import { watchGetUser } from './user/userSaga';
import { all, call } from 'redux-saga/effects';

export default function* rootSaga() {
  yield all([
    call(watchRetrieveToken),
    call(watchLogin),
    call(watchRegister),
    call(watchLogout),
    call(watchGetUser)
  ]);
}
