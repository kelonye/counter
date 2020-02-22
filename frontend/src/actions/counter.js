import { ACTION_TYPE_SET_COUNT } from 'config';
import { COUNTER_CONTRACT } from 'utils/wallet';
import { trackTransaction } from './wallet';

export function setCount(payload) {
  return {
    type: ACTION_TYPE_SET_COUNT,
    payload,
  };
}

export function incrementCount() {
  return async(dispatch, getState) => {
    try {
      await dispatch(
        trackTransaction(await COUNTER_CONTRACT.write('incrementCount'))
      );
    } catch (e) {
      console.warn(e);
    }
  };
}

export function decrementCount() {
  return async(dispatch, getState) => {
    try {
      await dispatch(
        trackTransaction(await COUNTER_CONTRACT.write('decrementCount'))
      );
    } catch (e) {
      console.warn(e);
    }
  };
}

export function resetCount() {
  return async(dispatch, getState) => {
    try {
      await dispatch(
        trackTransaction(await COUNTER_CONTRACT.write('resetCount'))
      );
    } catch (e) {
      console.warn(e);
    }
  };
}
