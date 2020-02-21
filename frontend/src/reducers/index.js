import { combineReducers } from 'redux';
import * as asyncInitialState from 'redux-async-initial-state';
import app from './app';
import wallet from './wallet';
import count from './count';

export default asyncInitialState.outerReducer(
  combineReducers({
    app,
    wallet,
    count,
    asyncInitialState: asyncInitialState.innerReducer, // last
  })
);
