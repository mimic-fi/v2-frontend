import { useState, useEffect } from 'react'

const useAbiFromEtherscan = contractAddress => {
  const [abi, setAbi] = useState(null)
  const [functions, setFunctions] = useState(null)

  useEffect(
    () => {
      const getAbi = async () => {
        const apiKey = 'JEV379M4BFXE61SX1VVX88J75CHCNRT2SR'
        const url = `https://api.etherscan.io/api?module=contract&action=getabi&address=${contractAddress}&apikey=${apiKey}`
        const response = await fetch(url)
        const result = await response.json()
        const abi = JSON.parse(result.result)
        const viewFunctions = abi.filter(
          func => func.type === 'function' && func.stateMutability === 'view' && func.inputs.length === 0
        )
        setAbi(abi)
        setFunctions(viewFunctions)
      }

      getAbi()
    },
    [contractAddress]
  )

  return { abi, functions }
}

export default useAbiFromEtherscan
