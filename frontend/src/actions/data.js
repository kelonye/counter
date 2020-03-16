import { ACTION_TYPE_UPDATE_DATA } from 'config';
import { COUNTER_CONTRACT } from 'contracts';
import { trackTransaction } from './wallet';

export function updateData(payload) {
  return {
    type: ACTION_TYPE_UPDATE_DATA,
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
