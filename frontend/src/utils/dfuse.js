import { createDfuseClient } from '@dfuse/client';
import { COUNTER_CONTRACT } from 'contracts';

const { REACT_APP_DFUSE_API_KEY } = process.env;

export default new (class {
  setClientNetwork(net) {
    this.client = createDfuseClient({
      apiKey: REACT_APP_DFUSE_API_KEY,
      network: net + '.eth.dfuse.io',
    });
  }

  async trackTransaction(transactionId) {
    console.log('dfuse: tracking %s', transactionId);

    const streamEthTransfers = `subscription () {
      searchTransactions(indexName: CALLS, query: "to:${COUNTER_CONTRACT.address}",  sort: ASC, cursor: "") {
        cursor
        node { hash from to value }
      }
    }`;

    const stream = await this.client.graphql(
      streamEthTransfers,
      message => {
        if (message.type === 'error') {
          console.log(
            'dfuse: an error occurred',
            message.errors,
            message.terminal
          );
        }

        if (message.type === 'data') {
          const { cursor, node } = message.data.searchTransactions;
          console.log('dfuse: message %s %s', node.hash, transactionId);
          if (node.hash === transactionId) {
            stream.close();
          } else {
            stream.mark({ cursor });
          }
        }
      },
      {
        variables: {},
      }
    );

    await stream.join();

    console.log('dfuse: complete');
  }

  // async trackContract() {
  //   const streamEthTransfers = `subscription () {
  //     searchTransactions(indexName: CALLS, query: "to:${COUNTER_CONTRACT.address}",  sort: ASC, cursor: "", lowBlockNum: "9490127") {
  //       cursor
  //       node { hash from to value }
  //     }
  //   }`;
  //
  //   const stream = await client.graphql(
  //     streamEthTransfers,
  //     message => {
  //       console.log(message);
  //       if (message.type === 'error') {
  //         console.log('An error occurred', message.errors, message.terminal);
  //       }
  //
  //       if (message.type === 'data') {
  //         const { cursor, node } = message.data.searchTransactions;
  //         console.log(`Transfer [${node.from} -> ${node.to}, ${node.value}]`);
  //
  //         stream.mark({ cursor });
  //       }
  //
  //       if (message.type === 'complete') {
  //         console.log('Stream completed');
  //       }
  //     },
  //     {
  //       variables: {},
  //     }
  //   );
  //
  //   await stream.join();
  // }
})();

// dfuse.trackContract()
//   .then(() => {
//     console.log('Completed');
//   })
//   .catch(error => {
//     console.log('An error occurred', error);
//   });
