import {
  INIT_TOKEN,
  SET_TOKEN,
  LOGIN_USER,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  REG_USER,
  REG_FAIL,
  REG_SUCCESS,
  LOGOUT_USER,
  RESET_AUTH
} from './authConstants';

describe('authConstants ', () => {
  it('INIT_TOKEN should be INIT_TOKEN', () => {
    expect(INIT_TOKEN).toBe('INIT_TOKEN');
  });
  it('SET_TOKEN should be SET_TOKEN', () => {
    expect(SET_TOKEN).toBe('SET_TOKEN');
  });
  it('LOGIN_USER should be LOGIN_USER', () => {
    expect(LOGIN_USER).toBe('LOGIN_USER');
  });
  it('LOGIN_FAIL should be LOGIN_FAIL', () => {
    expect(LOGIN_FAIL).toBe('LOGIN_FAIL');
  });
  it('LOGIN_SUCCESS should be LOGIN_SUCCESS', () => {
    expect(LOGIN_SUCCESS).toBe('LOGIN_SUCCESS');
  });
  it('REG_USER should be REG_USER', () => {
    expect(REG_USER).toBe('REG_USER');
  });
  it('REG_FAIL should be REG_FAIL', () => {
    expect(REG_FAIL).toBe('REG_FAIL');
  });
  it('REG_SUCCESS should be REG_SUCCESS', () => {
    expect(REG_SUCCESS).toBe('REG_SUCCESS');
  });
  it('LOGOUT_USER should be LOGOUT_USER', () => {
    expect(LOGOUT_USER).toBe('LOGOUT_USER');
  });
  it('RESET_AUTH should be RESET_AUTH', () => {
    expect(RESET_AUTH).toBe('RESET_AUTH');
  });
});
