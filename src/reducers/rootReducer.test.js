import sinon from 'sinon';
import * as ReduxModule from 'redux';

import authReducer from './auth/authReducer';
import userReducer from './user/userReducer';
import * as ReducerUtilsModule from '../common/utils/reducerUtils';

describe('rootReducer ', () => {
  let sandbox;
  const combinedReducer = () => {};
  const reduceReducer = () => {};

  let combinedReducersArg;
  let reduceReducersArg;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
    sandbox.stub(ReduxModule, 'combineReducers').callsFake(r => {
      combinedReducersArg = r;
      return combinedReducer;
    });

    sandbox.stub(ReducerUtilsModule, 'reduceReducers').callsFake((...r) => {
      reduceReducersArg = r;
      return reduceReducer;
    });

    require('./rootReducer');
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('combineReducers should set auth to use authReducer', () => {
    expect(combinedReducersArg.auth).toEqual(authReducer);
  });

  it('combineReducers should set user to use userReducer', () => {
    expect(combinedReducersArg.user).toEqual(userReducer);
  });

  it('reduceReducers should take combineReducer as argument', () => {
    expect(reduceReducersArg[0]).toBe(combinedReducer);
  });
});
