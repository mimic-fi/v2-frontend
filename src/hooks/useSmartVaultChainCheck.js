import { useMemo } from 'react'
import { CHAIN_INFO, CHAIN_SUBGRAPH_URL } from '../constants/chainInfo'
import axios from 'axios'

const useSmartVaultChainCheck = (address = '') => {

  return useMemo(() => {
    const posts = []

    Object.values(CHAIN_INFO).forEach(async c => {
      const chainInfoCheck = await chainCheck(c.value, address)
      if (chainInfoCheck) posts.push({value: c.value})
    })
    return posts
  }, [address])
}

const chainCheck = async (chain, address = '') => {
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
    .catch((error) => {
      console.error(error)
    })

  return check
}

export default useSmartVaultChainCheck
