import Promise from 'bluebird';
import Web3 from 'web3';
import store from 'store';

export const WRITES_ENABLED = typeof window.web3 !== 'undefined';

export const WEB3 = new Web3(
  WRITES_ENABLED
    ? window.web3.currentProvider
    : new Web3.providers.HttpProvider(
        'https://mainnet.infura.io/v3/90b4177113144a0c82b2b64bc01950e1'
      )
);
window.WEB3 = WEB3;

export class Contract {
  setNetworkId(networkId) {
    this.networkId = networkId;
  }

  setContract(json) {
    const network = json.networks[this.networkId];
    this.address = network.address;
    this.contract = new WEB3.eth.Contract(json.abi, this.address);
  }

  async read(method, args = []) {
    return this.callContract(false, method, args);
  }

  async write(method, args = [], options = {}) {
    return this.callContract(true, method, args, options);
  }

  async callContract(write, method, args, options) {
    return new Promise((resolve, reject) => {
      const writeOpts = {};
      if (write) {
        const {
          wallet: { account },
        } = store.getState();
        writeOpts.from = account;
        for (const k in options) {
          writeOpts[k] = options[k];
        }
      }
      this.contract.methods[method](...args)[write ? 'send' : 'call'](
        ...(write ? [writeOpts] : []),
        (err, response) => {
          if (err) return reject(new Error(err.message));
          resolve(response.c?.[0] ?? response);
        }
      );
    });
  }

  async on(eventName, fn) {
    this.contract.events[eventName]({}, fn);
  }
}
