import sinon from 'sinon';

import * as ReducerUtilsModule from '../../common/utils/reducerUtils';
import {
  SET_USER,
  SET_USER_SERVICE_FAIL,
  SET_USER_SERVICE_SUCCESS
} from './userConstants';

describe('userReducer ', () => {
  let sandbox;
  let initialState;
  let handlers;
  const createdReducer = () => {};

  beforeEach(() => {
    sandbox = sinon.createSandbox();

    sandbox.stub(ReducerUtilsModule, 'createReducer').callsFake((s, h) => {
      initialState = s;
      handlers = h;
      return createdReducer;
    });

    require('./userReducer');
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('should return the initialState', () => {
    //Given
    const expectedInitialState = {
      user: null,
      hasErrors: false,
      error: null
    };

    //Then
    expect(initialState).toEqual(expectedInitialState);
  });

  it('SET_USER should update user state', () => {
    //Given
    let payload = {
      user: 'user'
    };
    let handler = handlers[SET_USER];
    const resultState = {
      ...initialState,
      user: payload.user
    };

    //When
    const result = handler(initialState, payload);

    //Then
    expect(result).toEqual(resultState);
  });

  it('SET_USER_SERVICE_FAIL should update hasErrors=true and error state', () => {
    //Given
    let payload = {
      error: 'error'
    };
    let handler = handlers[SET_USER_SERVICE_FAIL];
    const resultState = {
      ...initialState,
      hasErrors: true,
      error: payload.error
    };

    //When
    const result = handler(initialState, payload);

    //Then
    expect(result).toEqual(resultState);
  });

  it('SET_USER_SERVICE_SUCCESS should update hasErrors=false and error=null state', () => {
    //Given
    let handler = handlers[SET_USER_SERVICE_SUCCESS];
    const resultState = {
      ...initialState,
      hasErrors: false,
      error: null
    };

    //When
    const result = handler(initialState);

    //Then
    expect(result).toEqual(resultState);
  });
});
