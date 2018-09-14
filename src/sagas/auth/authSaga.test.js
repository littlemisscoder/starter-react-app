import { takeLatest } from 'redux-saga/effects';
import { testSaga } from 'redux-saga-test-plan';

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
import { AuthService } from '../../services/api';
import {
  retrieveTokenFromLocalStorage,
  watchRetrieveToken,
  login,
  watchLogin,
  register,
  watchRegister,
  watchLogout,
  logout
} from './authSaga';
import LocalStorageService from '../../services/LocalStorageService';
import { NetworkError } from '../../services/api/errorMessages';

jest.mock('../../services/LocalStorageService', () => {
  return {
    getToken: jest.fn(),
    setToken: jest.fn()
  };
});

describe('authSaga ', () => {
  it('watchRetrieveToken should call retrieveTokenFromLocalStorage', () => {
    //When
    let result = watchRetrieveToken().next().value;

    //Then
    expect(result).toEqual(
      takeLatest(INIT_TOKEN, retrieveTokenFromLocalStorage)
    );
  });

  it('watchLogin should call login', () => {
    //When
    let result = watchLogin().next().value;

    //Then
    expect(result).toEqual(takeLatest(LOGIN_USER, login));
  });

  it('watchRegister should call register', () => {
    //When
    let result = watchRegister().next().value;

    //Then
    expect(result).toEqual(takeLatest(REG_USER, register));
  });

  it('watchLogout should call logout', () => {
    //When
    let result = watchLogout().next().value;

    //Then
    expect(result).toEqual(takeLatest(LOGOUT_USER, logout));
  });

  describe('retrieveTokenFromLocalStorage ', () => {
    beforeAll(() => {
      LocalStorageService.getToken
        .mockImplementationOnce(() => 'token')
        .mockImplementationOnce(() => 'token')
        .mockImplementationOnce(() => null);
    });
    afterEach(() => {
      LocalStorageService.setToken.mockClear();
    });

    it('should run saga', () => {
      //Given
      let token = 'token';
      let serviceResponse = {
        status: 'success',
        data: {
          username: 'username'
        },
        message: 'message'
      };

      //When
      testSaga(retrieveTokenFromLocalStorage)
        .next()
        .call(AuthService.verifyToken, token)
        .next(serviceResponse)
        .put(loginSuccess(token, serviceResponse.data.username))
        .next()
        .put(getUser()).isDone;
      expect(LocalStorageService.setToken.mock.calls).toHaveLength(1);
      expect(LocalStorageService.setToken.mock.calls[0][0]).toBe(token);
    });

    it('should catch error when service call throws error', () => {
      //Given
      let token = 'token';
      let error = 'error';

      //When
      testSaga(retrieveTokenFromLocalStorage)
        .next()
        .call(AuthService.verifyToken, token)
        .throw(error)
        .put(loginFail()).isDone;
      expect(LocalStorageService.setToken.mock.calls).toHaveLength(1);
      expect(LocalStorageService.setToken.mock.calls[0][0]).toBe(null);
    });

    it('should return when getToken returns null', () => {
      //When
      testSaga(retrieveTokenFromLocalStorage).next().isDone;

      //Then
      expect(LocalStorageService.setToken.mock.calls).toHaveLength(0);
    });
  });

  describe('login ', () => {
    afterEach(() => {
      LocalStorageService.setToken.mockClear();
    });

    it('should run saga', () => {
      //Given
      let token = 'token';
      let username = 'username';
      let action = {
        payload: {
          username,
          password: 'password'
        }
      };
      let serviceResponse = {
        data: {
          username,
          token
        }
      };

      //When
      testSaga(login, action)
        .next()
        .put(loginFail())
        .next()
        .call(AuthService.login, action.payload)
        .next(serviceResponse)
        .put(loginSuccess(token, username))
        .next()
        .put(getUser()).isDone;
      expect(LocalStorageService.setToken.mock.calls).toHaveLength(1);
      expect(LocalStorageService.setToken.mock.calls[0][0]).toBe(token);
    });

    it('should catch error when service call throws error', () => {
      //Given
      let username = 'username';
      let action = {
        payload: {
          username,
          password: 'password'
        }
      };
      let error = 'error';

      //When
      testSaga(login, action)
        .next()
        .put(loginFail())
        .next()
        .call(AuthService.login, action.payload)
        .throw(error)
        .put(loginFail(NetworkError)).isDone;
      expect(LocalStorageService.setToken.mock.calls).toHaveLength(1);
      expect(LocalStorageService.setToken.mock.calls[0][0]).toBe(null);
    });

    it('should catch error with message when service call returns error.message', () => {
      //Given
      let username = 'username';
      let action = {
        payload: {
          username,
          password: 'password'
        }
      };
      let error = {
        message: 'Failed'
      };

      //When
      testSaga(login, action)
        .next()
        .put(loginFail())
        .next()
        .call(AuthService.login, action.payload)
        .throw(error)
        .put(loginFail(error.message)).isDone;
      expect(LocalStorageService.setToken.mock.calls).toHaveLength(1);
      expect(LocalStorageService.setToken.mock.calls[0][0]).toBe(null);
    });
  });

  describe('register ', () => {
    afterEach(() => {
      LocalStorageService.setToken.mockClear();
    });

    it('should run saga', () => {
      //Given
      let token = 'token';
      let username = 'username';
      let action = {
        payload: {
          username,
          password: 'password'
        }
      };
      let serviceResponse = {
        data: {
          username,
          token
        }
      };

      //When
      testSaga(register, action)
        .next()
        .put(registerFail())
        .next()
        .call(AuthService.register, action.payload)
        .next(serviceResponse)
        .put(registerSuccess(token, username))
        .next()
        .put(getUser()).isDone;
      expect(LocalStorageService.setToken.mock.calls).toHaveLength(1);
      expect(LocalStorageService.setToken.mock.calls[0][0]).toBe(token);
    });

    it('should catch error when service call throws error', () => {
      //Given
      let username = 'username';
      let action = {
        payload: {
          username,
          password: 'password'
        }
      };
      let error = 'error';

      //When
      testSaga(register, action)
        .next()
        .put(registerFail())
        .next()
        .call(AuthService.register, action.payload)
        .throw(error)
        .put(registerFail(NetworkError)).isDone;
      expect(LocalStorageService.setToken.mock.calls).toHaveLength(1);
      expect(LocalStorageService.setToken.mock.calls[0][0]).toBe(null);
    });

    it('should catch error with message when service call returns error.message', () => {
      //Given
      let username = 'username';
      let action = {
        payload: {
          username,
          password: 'password'
        }
      };
      let error = {
        message: 'Failed'
      };

      //When
      testSaga(register, action)
        .next()
        .put(registerFail())
        .next()
        .call(AuthService.register, action.payload)
        .throw(error)
        .put(registerFail(error.message)).isDone;
      expect(LocalStorageService.setToken.mock.calls).toHaveLength(1);
      expect(LocalStorageService.setToken.mock.calls[0][0]).toBe(null);
    });
  });

  describe('logout ', () => {
    afterEach(() => {
      LocalStorageService.setToken.mockClear();
    });

    it('should call setToken with null and call resetAuth', () => {
      //When
      testSaga(logout)
        .next()
        .put(resetAuth()).isDone;
      expect(LocalStorageService.setToken.mock.calls).toHaveLength(1);
      expect(LocalStorageService.setToken.mock.calls[0][0]).toBe(null);
    });
  });
});
