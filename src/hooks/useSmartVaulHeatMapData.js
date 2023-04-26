import { useQuery } from 'react-query'
import { request, gql } from 'graphql-request'
import { CHAIN_SUBGRAPH_URL } from '../constants/chainInfo'
import { useChainId } from './useChainId'
import { useMemo } from 'react'
import moment from 'moment'

const useSmartVaulHeatMapData = (id = '0x', chain) => {
  const chainId = useChainId()
  const chainToUse = chain || chainId
  const { data, isLoading } = useQuery(
    ['useSmartVaulHeatMapData', chainToUse, id],
    () => fetchSmartVault(chainToUse, id.toString()),
    {
      refetchInterval: 10000,
    }
  )

  return useMemo(() => {
    var count = {}
    data?.transactions.forEach(t => { count[moment.unix(t?.executedAt).format('YYYY/MM/DD')] = (count[moment.unix(t?.executedAt).format('YYYY/MM/DD')] || 0) + 1 })
    const heat = Object.keys(count).map(i => { return { date: i.toString(), count: count[i] } })
    return {heat, isLoading}
  // eslint-disable-next-line 
  }, [data, chain, isLoading])
}

const fetchSmartVault = async (chainId, id) => {
  //TODO: put id in the query. Cause for some reason is failing
  let { smartVault } = await request(
    CHAIN_SUBGRAPH_URL[chainId],
    gql`
    {
      smartVault (id: ${'"' + id.toLowerCase() + '"'}){
        id
        transactions {
          hash
          executedAt
        }
      }
    }
    `
  )
  return smartVault
}

export default useSmartVaulHeatMapData
