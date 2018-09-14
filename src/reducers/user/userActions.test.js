import {
  getUser,
  setUser,
  setUserServiceFailure,
  setUserServiceSuccess
} from './userActions';
import {
  GET_USER,
  SET_USER,
  SET_USER_SERVICE_FAIL,
  SET_USER_SERVICE_SUCCESS
} from './userConstants';

describe('userActions ', () => {
  it('getUser should return GET_USER', () => {
    //Given
    let expectedAction = {
      type: GET_USER
    };

    //When
    let result = getUser();

    //Then
    expect(result).toEqual(expectedAction);
  });

  it('setUser should return SET_USER', () => {
    //Given
    let user = 'user';
    let expectedAction = {
      type: SET_USER,
      payload: {
        user
      }
    };

    //When
    let result = setUser(user);

    //Then
    expect(result).toEqual(expectedAction);
  });

  it('setUserServiceFailure should return SET_USER_SERVICE_FAIL', () => {
    //Given
    let error = 'error';
    let expectedAction = {
      type: SET_USER_SERVICE_FAIL,
      payload: {
        error
      }
    };

    //When
    let result = setUserServiceFailure(error);

    //Then
    expect(result).toEqual(expectedAction);
  });

  it('setUserServiceSuccess should return SET_USER_SERVICE_SUCCESS', () => {
    //Given
    let expectedAction = {
      type: SET_USER_SERVICE_SUCCESS
    };

    //When
    let result = setUserServiceSuccess();

    //Then
    expect(result).toEqual(expectedAction);
  });
});
