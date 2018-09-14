import { combineReducers } from 'redux';
import { reduceReducers } from '../common/utils/reducerUtils';

import authReducer from './auth/authReducer';
import userReducer from './user/userReducer';

const combinedReducer = combineReducers({
  auth: authReducer,
  user: userReducer
});

const rootReducer = reduceReducers(combinedReducer);

export default rootReducer;
