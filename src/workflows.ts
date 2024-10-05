import { proxyActivities } from '@temporalio/workflow';
// Only import the activity types
import type * as activities from './activities';
import { DataInput } from './shared';

const { getProduct, graphQLProduct } = proxyActivities<typeof activities>({
  startToCloseTimeout: '1 minute',
});

/** A workflow that simply calls an activity */
// export async function product(input: DataInput) {
//   const resRest = await getProduct(input.id);
//   const resGraphQL = await graphQLProduct(input.graphQL);
//   return {resRest, resGraphQL};
// }
export async function product(input: DataInput) {
  const resRest = await getProduct(input.id);
  const resGraphQL = await graphQLProduct();
  return {resRest, resGraphQL};
}
