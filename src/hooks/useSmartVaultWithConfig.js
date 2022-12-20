import { useQuery } from 'react-query'
import { request, gql } from 'graphql-request'
import { CHAIN_SUBGRAPH_URL } from '../constants/chainInfo'
import { useChainId } from './useChainId'

const useSmartVaultWithConfig = (id = '0x') => {
  const chainId = useChainId()
  return useQuery(
    ['useSmartVaultWithConfig', chainId, id],
    () => fetchSmartVault(chainId, id.toString()),
    {
      refetchInterval: 10000,
    }
  )
}

const fetchSmartVault = async (chainId, id) => {
  //TODO: put id in the query. Cause for some reason is failing
  let {smartVault} = await request(
    CHAIN_SUBGRAPH_URL[chainId],
    gql`
    {
        smartVault(id: ${'"' + id.toLowerCase() + '"'}) {
          id
          totalValueManaged
          priceFeeds {
            base {
              id
            }
            quote {
              id
            }
            feed
          }
          priceOracle
          swapConnector
          strategies
          feeCollector
          wrappedNativeToken {
            name
            symbol
            decimals
          }
          swapFee {
            pct
            cap
            token {
              name
              symbol
              decimals
            }
            period
          }
          withdrawFee {
             pct
            cap
            token {
              name
              symbol
              decimals
            }
            period
          }
          performanceFee {
             pct
            cap
            token {
              name
              symbol
              decimals
            }
            period
          }
          permissions {
            method
            target {
              id
            }
            grantees {
              id
            }
          }
        }
      }
    `
  )
  return smartVault
}

export default useSmartVaultWithConfig
