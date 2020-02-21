import { combineReducers } from 'redux';
import * as asyncInitialState from 'redux-async-initial-state';
import app from './app';
import counter from './counter';

export default asyncInitialState.outerReducer(
  combineReducers({
    app,
    counter,
    asyncInitialState: asyncInitialState.innerReducer, // last
  })
);
