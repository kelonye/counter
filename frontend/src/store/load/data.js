import { COUNTER_CONTRACT, WEB3 } from 'utils/wallet';

export default Base =>
  class extends Base {
    async loadData() {
      try {
        this.state.count = await COUNTER_CONTRACT.read('getCount');
        this.state.wallet.account = (await WEB3.eth.getAccounts())[0];
      } catch (error) {
        console.log(error);
      }
    }
  };
