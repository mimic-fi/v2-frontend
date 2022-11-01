import { useQuery } from 'react-query'
import { request, gql } from 'graphql-request'

const useSmartVaultWithPrimitives = (id = '0x') => {
  return useQuery(
    ['useSmartVaultWithPrimitives', id],
    () => fetchSmartVault(id.toString()),
    {
      refetchInterval: 10000,
    }
  )
}

const fetchSmartVault = async id => {
  //TODO: put id in the query. Cause for some reason is failing
  let smartVault = await request(
    'https://api.thegraph.com/subgraphs/name/mimic-fi/v2-goerli',
    gql`
      {
        wallet(id: ${'"'+ id.toLowerCase() + '"'}) {
          id
          primitiveExecutions {
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
      }
    `
  )
  return smartVault
}

export default useSmartVaultWithPrimitives
