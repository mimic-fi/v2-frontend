import { useState, useEffect } from 'react'
import { useChainId } from '../hooks/useChainId'

const useAbiFromEtherscan = contractAddress => {
  const [abi, setAbi] = useState(null)
  const [functions, setFunctions] = useState(null)
  const chainId = useChainId()


  useEffect(
    () => {
      const getAbi = async () => {
        let apiKey = process.env.MAINNET_API_KEY
        let url = `https://api.etherscan.io/api?module=contract&action=getabi&address=${contractAddress}&apikey=${apiKey}`

        switch (chainId) {
          case 42161:
            apiKey = process.env.ARBITRUM_API_KEY
            url = `https://api.arbiscan.io/api?module=contract&action=getabi&address=${contractAddress}&apikey=${apiKey}`
            break
          case 10:
            url = `https://api-optimistic.etherscan.io/api?module=contract&action=getabi&address=${contractAddress}&apikey=${apiKey}`
            break
          case 100:
            apiKey = process.env.GNOSIS_API_KEY
            url = `https://api.gnosisscan.io/api?module=contract&action=getabi&address=${contractAddress}&apikey=${apiKey}`
            break
          case 137:
            apiKey = process.env.POLYGON_API_KEY
            url = `https://api.polygonscan.com/api?module=contract&action=getabi&address=${contractAddress}&apikey=${apiKey}`
            break
          case 43114:
            apiKey = process.env.AVALANCHE_API_KEY
            url = `https://api.snowtrace.io/api?module=contract&action=getabi&address=${contractAddress}&apikey=${apiKey}`
            break
          case 250:
            apiKey = process.env.FANTOM_API_KEY
            url = `https://api.ftmscan.com/api?module=contract&action=getabi&address=${contractAddress}&apikey=${apiKey}`
            break
          case 56:
            apiKey = process.env.BSC_API_KEY
            url = `https://api.bscscan.com/api?module=contract&action=getabi&address=${contractAddress}&apikey=${apiKey}`
            break
          case 324:
            url = `https://explorer.zksync.io/api/v0.1/contracts/${contractAddress}/abi`
            break
          default:
            apiKey = process.env.MAINNET_API_KEY
            url = `https://api.etherscan.io/api?module=contract&action=getabi&address=${contractAddress}&apikey=${apiKey}`
        }

        const response = await fetch(url)
        const result = await response.json()
        const abi = JSON.parse(result.result)
        const viewFunctions = abi.filter(
          func =>
            func.type === 'function' &&
            func.stateMutability === 'view' &&
            func.inputs.length === 0
        )
        setAbi(abi)
        setFunctions(viewFunctions)
      }

      getAbi()
    },
    [contractAddress, chainId]
  )

  return { abi, functions }
}

export default useAbiFromEtherscan
