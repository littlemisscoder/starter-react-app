import sinon from 'sinon';
import * as AuthSagaModule from './auth/authSaga';
import * as UserSagaModule from './user/userSaga';
import { all, call } from 'redux-saga/effects';
import rootSaga from './rootSaga';

describe('rootSaga ', () => {
  let watchRetrieveToken;
  let watchLogin;
  let watchRegister;
  let watchLogout;
  let watchGetUser;

  beforeAll(() => {
    watchRetrieveToken = sinon.stub(AuthSagaModule, 'watchRetrieveToken');
    watchLogin = sinon.stub(AuthSagaModule, 'watchLogin');
    watchRegister = sinon.stub(AuthSagaModule, 'watchRegister');
    watchLogout = sinon.stub(AuthSagaModule, 'watchLogout');
    watchGetUser = sinon.stub(UserSagaModule, 'watchGetUser');
  });

  it('yields all top-level sagas', () => {
    // When
    const result = rootSaga().next().value;

    // Then
    expect(result).toEqual(
      all([
        call(watchRetrieveToken),
        call(watchLogin),
        call(watchRegister),
        call(watchLogout),
        call(watchGetUser)
      ])
    );
  });
});
