import COUNTER_CONTRACT_JSON from 'data/contracts/Counter';
import { WEB3, WRITES_ENABLED } from 'utils/wallet';
import dfuse from 'utils/dfuse';
import { COUNTER_CONTRACT } from 'contracts';

export default Base =>
  class extends Base {
    async loadData() {
      try {
        let networkId = 1;
        let networkName = 'main';

        if (WRITES_ENABLED) {
          networkId = await window.WEB3.eth.net.getId();
          networkName = await window.WEB3.eth.net.getNetworkType();
        }

        this.state.wallet.networkId = networkId;
        this.state.wallet.networkName = networkName;

        dfuse.setClientNetwork(networkName === 'main' ? 'mainet' : networkName);

        const networkSupported = (this.state.wallet.networkSupported =
          networkId in COUNTER_CONTRACT_JSON.networks);

        if (networkSupported) {
          COUNTER_CONTRACT.setNetworkId(networkId);
          COUNTER_CONTRACT.setContract(COUNTER_CONTRACT_JSON);

          this.state.data.count = await COUNTER_CONTRACT.read('getCount');
          this.state.wallet.account = (await WEB3.eth.getAccounts())[0];
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
