import sinon from 'sinon';

import AuthService from './AuthService';
import * as CheckStatusModule from './checkStatus';

const API_URL = process.env.REACT_APP_API_URL;

describe('AuthService ', () => {
  let sandbox;
  let fetch;
  let checkStatusCallCount = 0;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
    fetch = sandbox.stub();
    fetch.returns(
      new Promise(resolve => {
        resolve('some string');
      })
    );
    global.fetch = fetch;
    sandbox.stub(CheckStatusModule, 'checkStatus').callsFake(() => {
      checkStatusCallCount++;
    });
  });

  afterEach(() => {
    sandbox.restore();
    global.fetch = undefined;
    checkStatusCallCount = 0;
  });

  describe('verifyToken ', () => {
    const token = 'token';

    it('should call checkStatus once', async () => {
      //When
      await AuthService.verifyToken(token);

      //Then
      expect(checkStatusCallCount).toBe(1);
    });

    it('should call /verifyToken correctly', async () => {
      //Given
      const expectedUrl = `${API_URL}verifyToken`;
      const expectedRequest = {
        method: 'post',
        headers: new Headers({
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'x-access-token': token
        }),
        body: null,
        mode: 'cors'
      };

      //When
      await AuthService.verifyToken(token);

      //Then
      expect(fetch.getCall(0).args).toEqual([expectedUrl, expectedRequest]);
    });
  });

  describe('login ', () => {
    const authCredentials = {
      username: 'username',
      password: 'password'
    };

    it('should call checkStatus once', async () => {
      //When
      await AuthService.login(authCredentials);

      //Then
      expect(checkStatusCallCount).toBe(1);
    });

    it('should call /login correctly', async () => {
      //Given
      const expectedUrl = `${API_URL}login`;
      const expectedRequest = {
        method: 'post',
        headers: new Headers({
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }),
        body: JSON.stringify(authCredentials),
        mode: 'cors'
      };

      //When
      await AuthService.login(authCredentials);

      //Then
      expect(fetch.getCall(0).args).toEqual([expectedUrl, expectedRequest]);
    });
  });

  describe('register ', () => {
    const authCredentials = {
      username: 'username',
      password: 'password'
    };

    it('should call checkStatus once', async () => {
      //When
      await AuthService.register(authCredentials);

      //Then
      expect(checkStatusCallCount).toBe(1);
    });

    it('should call /register correctly', async () => {
      //Given
      const expectedUrl = `${API_URL}register`;
      const expectedRequest = {
        method: 'post',
        headers: new Headers({
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }),
        body: JSON.stringify(authCredentials),
        mode: 'cors'
      };

      //When
      await AuthService.register(authCredentials);

      //Then
      expect(fetch.getCall(0).args).toEqual([expectedUrl, expectedRequest]);
    });
  });
});
