import { useQuery } from 'react-query'
import { request, gql } from 'graphql-request'

const usePrimitiveExecutions = () => {
  return useQuery(['primitiveExecutions'], () => fetchPrimitiveExecutions(), {
    refetchInterval: 10000,
  })
}

const fetchPrimitiveExecutions = async () => {
  let primitiveExecutions
  await request(
    'https://api.thegraph.com/subgraphs/name/mimic-fi/v2-goerli',
    gql`
      {
        primitiveExecutions(groupBy: [TRANSACTION]) {
          id
          type
          tokenIn {
            id
            name
            symbol
            decimals
          }
          amountIn
          tokenOut {
            id
            name
            symbol
            decimals
          }
          amountOut
          executedAt
          transaction
          fee {
            pct
            token {
              id
              name
              symbol
              decimals
            }
            amount
            feeCollector
          }
        }
      }
    `
  )
    .then(data => (primitiveExecutions = data.primitiveExecutions))
    .catch(error => console.error(error))

  return primitiveExecutions
}


export default usePrimitiveExecutions
