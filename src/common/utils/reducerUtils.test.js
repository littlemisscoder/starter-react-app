import sinon from 'sinon';
import { createReducer, reduceReducers } from './reducerUtils';

describe('reducerUtils ', () => {
  describe('createReducer ', () => {
    it('should return initial state when state is undefined', () => {
      //Given
      const TYPE = 'TYPE';
      const initialState = {
        value: 'value'
      };
      const fnMap = {};
      const action = {
        type: TYPE,
        payload: {}
      };

      //When
      let reducer = createReducer(initialState, fnMap);
      let result = reducer(undefined, action);

      //Then
      expect(result).toBe(initialState);
    });

    it('should return state altered by handler', () => {
      //Given
      const initialState = {
        value: 'value'
      };
      const TYPE = 'TYPE';
      const action = {
        type: TYPE,
        payload: {
          value: 'new_value'
        }
      };
      const handler = (state, payload) => {
        const { value } = payload;
        return {
          ...state,
          value
        };
      };
      const fnMap = {
        [TYPE]: handler
      };

      const expectedNewState = {
        value: 'new_value'
      };

      //When
      let reducer = createReducer(initialState, fnMap);
      let result = reducer(undefined, action);

      //Then
      expect(result).toEqual(expectedNewState);
    });
  });

  describe('reduceReducers ', () => {
    it('should creates reducer that chains reducers together', () => {
      //Given
      const initialState = {};
      const stateAfterReducer1 = {};
      const stateAfterReducer2 = {};
      const TYPE = 'TYPE';
      const action = {
        type: TYPE
      };
      let reducer1 = sinon.stub();
      let reducer2 = sinon.stub();
      reducer1.withArgs(initialState, action).returns(stateAfterReducer1);
      reducer2.withArgs(stateAfterReducer1, action).returns(stateAfterReducer2);

      //When
      let reducers = reduceReducers(reducer1, reducer2);
      let result = reducers(initialState, action);

      //Then
      expect(result).toEqual(stateAfterReducer2);
    });
  });
});
