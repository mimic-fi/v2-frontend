import { useMemo } from 'react'
import { CHAIN_INFO, CHAIN_SUBGRAPH_URL } from '../constants/chainInfo'
import axios from 'axios'
import { useQueries } from 'react-query'

const useSmartVaultChainCheck = (address = '') => {
  const chains = Object.values(CHAIN_INFO)
  const queriesChain = chains.map((chain) => {
    return {
      queryKey: ['smart-vault', chain.value, address],
      queryFn: () => fetchChainCheck(chain.value, address),
      select: data => ({ value: chain.value, data })
    }
  })

  const chainQueries = useQueries(queriesChain)

  return useMemo(() => {
    return chainQueries.filter(c => c.data).map(c => { return c.data })
  }, [chainQueries])
}


const fetchChainCheck = async (chain, address = '') => {
  console.log(chain, CHAIN_SUBGRAPH_URL[chain])
  const check = axios.post(CHAIN_SUBGRAPH_URL[chain], {
    query: `
    {
      smartVault(id: ${'"' + address?.toLowerCase() + '"'}) {
        id
      }
    }  
  `
  })
    .then((res) => {
      return res?.data?.data?.smartVault?.id
    })
  // .catch((error) => {
  //   console.error(error)
  // })

  return check
}

export default useSmartVaultChainCheck
