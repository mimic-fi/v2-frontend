import { useQuery } from 'react-query'
import { request, gql } from 'graphql-request'
import { CHAIN_SUBGRAPH_URL } from '../constants/chainInfo'
import { useChainId } from './useChainId'

const useSmartVaultWithPrimitives = (id = '0x') => {
  const chainId = useChainId()
  return useQuery(
    ['useSmartVaultWithPrimitives', chainId, id],
    () => fetchSmartVault(chainId, id.toString()),
    {
      refetchInterval: 10000,
    }
  )
}

const fetchSmartVault = async (chainId, id) => {
  //TODO: put id in the query. Cause for some reason is failing
  let smartVault = await request(
    CHAIN_SUBGRAPH_URL[chainId],
    gql`
    {
        smartVault(id: ${'"' + id.toLowerCase() + '"'}) {
          id
          primitiveExecutions(orderBy: executedAt, orderDirection: desc) {
            id
            type
            data
            executedAt
            transaction
      			target
            sender
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
            movements {
              id
              type
              token {
                id
                name
                symbol
                decimals
              	}
              amount
            	}
          	}
          }
        }
    `
  )
  return smartVault
}

export default useSmartVaultWithPrimitives
