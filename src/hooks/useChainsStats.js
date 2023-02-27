import { useMemo } from 'react'
import { CHAIN_INFO, CHAIN_SUBGRAPH_URL } from '../constants/chainInfo'
import axios from 'axios'
import { useQueries } from 'react-query'

const useChainsStats = () => {
  const chains = Object.values(CHAIN_INFO).filter(item => {
    return item.isTestnet ? null : item
  })
  const queriesChain = chains.map((chain) => {
    return {
      queryKey: ['stats', chain.value],
      queryFn: () => fetchChainCheck(chain.value),
      select: data => ({ value: chain.value, data })
    }
  })

  const chainQueries = useQueries(queriesChain)

  return useMemo(() => {
    return chainQueries.filter(c => c.data).map(c => { return c.data })
  }, [chainQueries])
}

const fetchChainCheck = async (chain) => {
  const check = axios.post(CHAIN_SUBGRAPH_URL[chain], {
    query: `
    { stats (id: "MIMIC_STATS") {
        id
        totalValueManaged
        totalFeesUsd
        totalGasRefundsUsd
        totalRelayedCostUsd
      }
    } 
  `
  })
    .then((res) => {
      return res?.data?.data?.stats
    })
  // .catch((error) => {
  //   console.error(error)
  // })

  return check
}

export default useChainsStats
