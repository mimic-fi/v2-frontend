import { useQuery } from 'react-query'
import { request, gql } from 'graphql-request'
import { CHAIN_SUBGRAPH_URL } from '../constants/chainInfo'
import { useChainId } from './useChainId'
import { useMemo } from 'react'

const useSmartVault = (id = '0x', limit = 10) => {
  const chainId = useChainId()

  return useQuery(['useSmartVault', chainId, id], () =>
    fetchSmartVault(chainId, id.toString())
  )
}

const fetchSmartVault = async (chainId, id) => {
  console.log('fetch')
  let { smartVault } = await request(
    CHAIN_SUBGRAPH_URL[chainId],
    gql`
    {
        smartVault(id: ${'"' + id.toLowerCase() + '"'}) {
          id
          totalValueManaged
        }
      }

    `
  )
  return smartVault
}

export default useSmartVault
