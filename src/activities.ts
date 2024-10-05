import axios from 'axios';

const shopifyHost = 'vtlclothingstore.myshopify.com';
const shopifyVersion = '2023-07';
const url = `https://${shopifyHost}/admin/api/${shopifyVersion}`;
const headers = {
  'Content-Type': 'application/json',
  'X-Shopify-Access-Token': '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'
};

// REST APIs
export async function getProduct(id: string): Promise<string>{
  const response = await axios({
    method: 'get',
    url: `${url}/products/${id}.json`,
    headers: headers
  });

  return response.data;
}

//GraphQL
export async function graphQLProduct(): Promise<string>{
  const response = await axios({
    method: 'post',
    url: `${url}/graphql.json`,
    headers: headers,
    data: JSON.stringify({
      query: `
          query {
            products(first: 10, reverse: true) {
              edges {
                node {
                  id
                  title
                  bodyHtml
                  vendor
                  productType
                  handle
                  templateSuffix
                  tags
                  status
                  createdAt
                  updatedAt
                  publishedAt
                }
              }
            }
          }
        `
    })
  });
  return response.data;
}