// import Promise from 'bluebird';
import { ACTION_TYPE_UPDATE_WALLET } from 'config';

export function loadWallet() {
  return async (dispatch, getState) => {
    try {
      const {
        wallet: { account },
      } = getState();
      if (!account) return;

      dispatch(updateWallet({ isLoaded: false }));

      // const [balance] = await Promise.all([
      //   TOKEN_CONTRACT.read('balanceOf', account),
      // ]);
      //
      // dispatch(
      //   updateWallet({
      //     balance,
      //   })
      // );
    } finally {
      dispatch(updateWallet({ isLoaded: true }));
    }
  };
}

export function activateWallet() {
  return async (dispatch, getState) => {
    await window.ethereum.enable();
    dispatch(loadWallet());
  };
}

export function updateWallet(payload) {
  return {
    type: ACTION_TYPE_UPDATE_WALLET,
    payload,
  };
}

export function trackTransaction(transactionId) {
  return async (dispatch, getState) => {
    dispatch(updateWallet({ isTrackingTransaction: true }));
    //
    dispatch(updateWallet({ isTrackingTransaction: false }));
  };
}
