import sinon from 'sinon';

import LocalStorageService from './LocalStorageService';

describe('LocalStorageService ', () => {
  describe('getToken ', () => {
    it('should call localStorage.getItem with simple-auth-app-storage-name', () => {
      //Given
      const storageName = 'simple-auth-app-storage-name';
      const expectedToken = 'token';
      let getItem = sinon.stub();
      getItem.withArgs(storageName).returns(expectedToken);
      const localStorageMock = {
        getItem
      };
      global.localStorage = localStorageMock;

      //When
      let result = LocalStorageService.getToken();

      //Then
      expect(result).toBe(expectedToken);
    });

    it('should call localStorage.getItem once', () => {
      //Given
      let getItem = sinon.spy();
      const localStorageMock = {
        getItem
      };
      global.localStorage = localStorageMock;

      //When
      LocalStorageService.getToken('token');

      //Then
      expect(getItem.calledOnce).toBeTruthy();
    });
  });

  it('setToken should call localStorage.setItem once', () => {
    //Given
    let setItem = sinon.spy();
    const localStorageMock = {
      setItem
    };
    global.localStorage = localStorageMock;

    //When
    LocalStorageService.setToken('token');

    //Then
    expect(setItem.calledOnce).toBeTruthy();
  });
});
