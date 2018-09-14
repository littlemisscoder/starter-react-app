import { takeLatest } from 'redux-saga/effects';
import { GET_USER } from '../../reducers/user/userConstants';
import { getUser, watchGetUser, getToken } from './userSaga';
import { testSaga } from 'redux-saga-test-plan';
import { UserService } from '../../services/api';
import {
  setUser,
  setUserServiceFailure,
  setUserServiceSuccess
} from '../../reducers/user/userActions';

describe('userSaga ', () => {
  it('watchGetUser should call getUser', () => {
    //When
    let userSagaResult = watchGetUser().next().value;

    //Then
    expect(userSagaResult).toEqual(takeLatest(GET_USER, getUser));
  });

  describe('getUser ', () => {
    it('should run saga', () => {
      //Given
      let token = 'token';
      let serviceResponse = {
        status: 'success',
        data: 'data',
        message: 'message'
      };

      //When
      testSaga(getUser)
        .next()
        .select(getToken)
        .next(token)
        .call(UserService.getUser, token)
        .next(serviceResponse)
        .put(setUserServiceSuccess())
        .next()
        .put(setUser(serviceResponse.data)).isDone;
    });

    it('should catch error when service call throws error', () => {
      //Given
      let token = 'token';
      let error = 'error';

      //When
      testSaga(getUser)
        .next()
        .select(getToken)
        .next(token)
        .call(UserService.getUser, token)
        .throw(error)
        .put(setUserServiceFailure(error)).isDone;
    });
  });
});
