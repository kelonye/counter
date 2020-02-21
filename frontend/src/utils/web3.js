import counter from 'data/contracts/Counter';
import Promise from 'bluebird';
import Web3 from 'web3';

export const WEB3 = (function() {
  if (typeof window.web3 !== 'undefined') {
    return new Web3(window.web3.currentProvider);
  } else {
    return new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
  }
})();

const ABIS = {
  counter,
};

export class Contract {
  constructor(contractType) {
    this.contract = this.getContract(contractType);
  }

  getContract(contractType) {
    const json = ABIS[contractType];
    return new WEB3.eth.Contract(
      json.abi,
      Object.values(json.networks)[0].address
    );
  }

  async read(method, ...args) {
    return this.callContract(false, method, ...args);
  }

  async write(method, ...args) {
    return this.callContract(true, method, ...args);
  }

  async callContract(write, method, ...args) {
    if (!WEB3) {
      throw new Error('Web3 client required.');
    }
    const accounts = await WEB3.eth.getAccounts(); // todo
    return new Promise((resolve, reject) => {
      this.contract.methods[method](...args)[write ? 'send' : 'call'](
        ...(write ? [{ from: accounts[0] }] : []),
        (err, response) => {
          if (err) return reject(err);
          resolve(response.c?.[0] ?? response);
        }
      );
    });
  }

  on(eventName, fn) {
    this.contract.events[eventName]({}, fn);
  }
}
