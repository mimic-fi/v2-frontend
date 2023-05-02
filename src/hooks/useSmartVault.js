import { useQuery } from 'react-query'
import { request, gql } from 'graphql-request'
import { CHAIN_SUBGRAPH_URL } from '../constants/chainInfo'
import { useChainId } from './useChainId'

const useSmartVault = (id = '0x', limit = 10) => {
  const chainId = useChainId()

  return useQuery(['useSmartVault', chainId, id], () =>
    fetchSmartVault(chainId, id.toString())
  )
}

const fetchSmartVault = async (chainId, id) => {
  let { smartVault } = await request(
    CHAIN_SUBGRAPH_URL[chainId],
    gql`
    {
        smartVault(id: ${'"' + id.toLowerCase() + '"'}) {
          id
          totalValueManaged
          actions {
           id
         }
        }
      }

    `
  )
  return smartVault
}

export default useSmartVault
