import { ACTION_TYPE_SET_COUNT } from 'config';
import { Contract } from 'utils/web3';

export const CONTRACT = new Contract('counter');

export function getCount() {
  return async(dispatch, getState) => {
    try {
      dispatch({
        type: ACTION_TYPE_SET_COUNT,
        payload: await CONTRACT.read('getCount'),
      });
    } catch (e) {
      console.warn(e);
    }
  };
}

export function incrementCount() {
  return async(dispatch, getState) => {
    try {
      await CONTRACT.write('incrementCount');
    } catch (e) {
      console.warn(e);
    }
  };
}

export function decrementCount() {
  return async(dispatch, getState) => {
    try {
      await CONTRACT.write('decrementCount');
    } catch (e) {
      console.warn(e);
    }
  };
}

export function resetCount() {
  return async(dispatch, getState) => {
    try {
      await CONTRACT.write('resetCount');
    } catch (e) {
      console.warn(e);
    }
  };
}

CONTRACT.on('Count', function(err, result) {
  console.log(arguments);
  if (err) {
    return console.error(err);
  }
});
