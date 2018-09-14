import {
  GET_USER,
  SET_USER,
  SET_USER_SERVICE_FAIL,
  SET_USER_SERVICE_SUCCESS
} from './userConstants';

describe('userConstants ', () => {
  it('GET_USER should be GET_USER', () => {
    expect(GET_USER).toBe('GET_USER');
  });
  it('SET_USER should be SET_USER', () => {
    expect(SET_USER).toBe('SET_USER');
  });
  it('SET_USER_SERVICE_FAIL should be SET_USER_SERVICE_FAIL', () => {
    expect(SET_USER_SERVICE_FAIL).toBe('SET_USER_SERVICE_FAIL');
  });
  it('SET_USER_SERVICE_SUCCESS should be SET_USER_SERVICE_SUCCESS', () => {
    expect(SET_USER_SERVICE_SUCCESS).toBe('SET_USER_SERVICE_SUCCESS');
  });
});
