import sinon from 'sinon';

import UserService from './UserService';
import * as CheckStatusModule from './checkStatus';

const API_URL = process.env.REACT_APP_API_URL;

describe('UserService ', () => {
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

  describe('getUser ', () => {
    const token = 'token';
    it('should call checkStatus once', async () => {
      //When
      await UserService.getUser(token);

      //Then
      expect(checkStatusCallCount).toBe(1);
    });

    it('should call /user correctly', async () => {
      //Given
      const expectedUrl = `${API_URL}user`;
      const expectedRequest = {
        method: 'get',
        headers: new Headers({
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'x-access-token': token
        }),
        body: null,
        mode: 'cors'
      };

      //When
      await UserService.getUser(token);

      //Then
      expect(fetch.getCall(0).args).toEqual([expectedUrl, expectedRequest]);
    });
  });
});
