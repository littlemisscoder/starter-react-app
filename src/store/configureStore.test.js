import sinon from 'sinon';
import * as ReduxModule from 'redux';
import * as ReduxSagaModule from 'redux-saga';
import * as DevTools from 'redux-devtools-extension/developmentOnly';
import * as RootReducerModule from '../reducers/rootReducer';

import configureStore from './configureStore';

jest.mock('../reducers/rootReducer');

describe('configureStore ', () => {
  let sandbox;
  let rootReducer;
  let createSagaMiddleware;
  let applyMiddleware;
  let compose;
  let createStore;
  let preloadedState;
  let sagaRun;
  let createdStore;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
    rootReducer = sandbox.spy(RootReducerModule, 'default');
    createSagaMiddleware = sandbox.stub(ReduxSagaModule, 'default');
    applyMiddleware = sandbox.stub(ReduxModule, 'applyMiddleware');
    compose = sandbox.stub(DevTools, 'composeWithDevTools');
    createStore = sandbox.stub(ReduxModule, 'createStore');

    preloadedState = {};

    sagaRun = sinon.spy();
    const sagaMiddleware = { run: sagaRun };
    createSagaMiddleware.returns(sagaMiddleware);

    const middlewareEnhancer = sinon.spy();
    applyMiddleware.withArgs(sagaMiddleware).returns(middlewareEnhancer);

    const composedEnhancer = sinon.spy();
    compose.withArgs(middlewareEnhancer).returns(composedEnhancer);

    createdStore = 'createdStore';
    createStore
      .withArgs(rootReducer, preloadedState, composedEnhancer)
      .returns(createdStore);
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('returns a store', () => {
    //When
    const store = configureStore(preloadedState);

    //Then
    expect(store).toBe(createdStore);
  });

  it('should call sagaMiddleware.run with rootSaga once', () => {
    //When
    configureStore(preloadedState);

    //Then
    expect(sagaRun.calledOnce).toBeTruthy();
  });
});
