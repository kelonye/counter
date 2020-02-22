import { createDfuseClient } from '@dfuse/client';
import { COUNTER_CONTRACT } from 'utils/wallet';

const { REACT_APP_DFUSE_API_KEY } = process.env;

const client = createDfuseClient({
  apiKey: REACT_APP_DFUSE_API_KEY,
  network: 'mainnet.eth.dfuse.io',
});

export async function trackTransaction(transactionId) {
  await COUNTER_CONTRACT.isReady();

  console.log('dfuse: tracking %s', transactionId);

  const streamEthTransfers = `subscription () {
    searchTransactions(indexName: CALLS, query: "to:${COUNTER_CONTRACT.address}",  sort: ASC, cursor: "") {
      cursor
      node { hash from to value }
    }
  }`;

  const stream = await client.graphql(
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

// export default async function trackContract() {
//   await COUNTER_CONTRACT.isReady();
//
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
//
// trackContract()
//   .then(() => {
//     console.log('Completed');
//   })
//   .catch(error => {
//     console.log('An error occurred', error);
//   });
