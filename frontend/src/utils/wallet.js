import COUNTER_CONTRACT_JSON from 'data/contracts/Counter';
import Promise from 'bluebird';
import Web3 from 'web3';
import store from 'store';
import { setCount } from 'actions';

const CONTRACTS_JSON = {
  counter: COUNTER_CONTRACT_JSON,
};

export const WEB3 = new Web3(
  typeof window.web3 !== 'undefined'
    ? window.web3.currentProvider
    : new Web3.providers.HttpProvider(
        'https://mainnet.infura.io/v3/90b4177113144a0c82b2b64bc01950e1'
      )
);
window.WEB3 = WEB3;

export class Contract {
  constructor(contractType) {
    this.setContractPromise = this.setContract(contractType);
  }

  async isReady() {
    await this.setContractPromise;
  }

  async setContract(contractType) {
    const networkId = await WEB3.eth.net.getId();
    console.log('network id', networkId);
    const json = CONTRACTS_JSON[contractType];
    this.address = json.networks[networkId].address;
    this.contract = new WEB3.eth.Contract(json.abi, this.address);
  }

  async read(method, ...args) {
    return this.callContract(false, method, ...args);
  }

  async write(method, ...args) {
    return this.callContract(true, method, ...args);
  }

  async callContract(write, method, ...args) {
    await this.setContractPromise;
    return new Promise((resolve, reject) => {
      const writeOpts = {};
      if (write) {
        const {
          wallet: { account },
        } = store.getState();
        writeOpts.from = account;
      }
      this.contract.methods[method](...args)[write ? 'send' : 'call'](
        ...(write ? [writeOpts] : []),
        (err, response) => {
          if (err) return reject(err.message);
          resolve(response.c?.[0] ?? response);
        }
      );
    });
  }

  async on(eventName, fn) {
    await this.setContractPromise;
    this.contract.events[eventName]({}, fn);
  }
}

const CONTRACT = new Contract('counter');
export const TOKEN_CONTRACT = CONTRACT;
export const COUNTER_CONTRACT = CONTRACT;

COUNTER_CONTRACT.on('Count', function(err, result) {
  if (err) {
    return console.error(err);
  }
  store.dispatch(setCount(parseInt(result.returnValues.count)));
});
