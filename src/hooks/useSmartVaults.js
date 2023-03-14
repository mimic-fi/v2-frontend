import { useQuery } from 'react-query'
import { request, gql } from 'graphql-request'
import { CHAIN_SUBGRAPH_URL } from '../constants/chainInfo'
import { useChainId } from './useChainId'

const useSmartVaults = () => {
  const chainId = useChainId()
  return useQuery(['smartVaults', chainId], () => fetchSmartVaults(chainId), {
    refetchInterval: 10000,
  })
}

const fetchSmartVaults = async (chainId = 1) => {
  let {smartVaults} = await request(
    CHAIN_SUBGRAPH_URL[chainId],
    gql`
      {
        smartVaults {
          id
          totalValueManaged
        }
      }
    `
  )
  return smartVaults
}

export default useSmartVaults
