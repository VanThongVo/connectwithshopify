import { Connection, Client } from '@temporalio/client';
import { TASK_QUEUE_NAME } from './shared';
import { product } from './workflows';
import { nanoid } from 'nanoid';

async function run() {
  // Connect to the default Server location
  const connection = await Connection.connect({ address: 'localhost:7233' });

  const client = new Client({
    connection,
  });

  // const input = {
  //   id : "8668482863400",
  //   graphQL : "graphql"
  // }

 
  if (process.argv.length < 3) {
    console.error('Must specify a input data code as the command-line arguments');
    process.exit(1);
  }

  const id = process.argv[2];
  const input = {
    id
  }
  const handle = await client.workflow.start(product, {
    taskQueue: TASK_QUEUE_NAME,
    // type inference works! args: [name: string]
    args: [input],
    // in practice, use a meaningful business ID, like customerId or transactionId
    workflowId: 'workflow-' + nanoid(),
  });
  console.log(`Started workflow ${handle.workflowId}`);

  // optional: wait for client result
  console.log(await handle.result()); 
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
