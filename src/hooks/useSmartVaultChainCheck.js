import { useMemo } from 'react'
import { CHAIN_INFO, CHAIN_SUBGRAPH_URL } from '../constants/chainInfo'
import axios from 'axios'
import { useQueries } from 'react-query'
import { useEffect } from 'react'

const useSmartVaultChainCheck = (address = '') => {

  const chains = useMemo(
    () =>
      Object.values(CHAIN_INFO).filter((item) => {
        return item.isDisabled ? null : item
      }),
    []
  )

  const queriesChain = chains.map(chain => {
    return chain && chain.value
      ? {
        queryKey: ['smart-vault', chain.value, address],
        queryFn: () => fetchChainCheck(chain.value, address),
        select: data => ({ value: chain.value, data }),
      }
      : undefined
  })

  const chainQueries = useQueries(queriesChain)

  const availableChains = useMemo(() => {
    return chainQueries.filter(c => c.data).map(c => {
      return c.data
    })
  }, [address, chainQueries])

  useEffect(() => {
    const refetchQueries = chainQueries.filter(q => q.isFetching)
    if (refetchQueries.length) {
      refetchQueries.forEach(q => q.refetch())
    }
  }, [address, chainQueries])

  return availableChains
}

const fetchChainCheck = async (chain, address) => {
  if (!chain) return []
  if (!address) return []
  const urlSubgraph = CHAIN_SUBGRAPH_URL[chain]

  if (!urlSubgraph) return []
  const check = axios
    .post(urlSubgraph, {
      query: `
    {
      smartVault(id: ${'"' + address?.toLowerCase() + '"'}) {
        id
      }
    }
  `,
    })
    .then(res => {
      return res?.data?.data?.smartVault?.id
    })

  return check
}

export default useSmartVaultChainCheck
