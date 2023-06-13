import { useCall } from '@usedapp/core'
import { useChainId } from './useChainId'
import { Contract } from '@ethersproject/contracts'

export default function useContractParams(contractAddress, abi, functionName) {
  const chainId = useChainId()
  console.log('use', contractAddress, abi, functionName, chainId)
  const contract = new Contract(contractAddress, abi)
  const { value } =
    useCall(
      contractAddress && {
        contract: contract,
        method: functionName,
        args: [],
      },
      { chainId: chainId }
    ) ?? {}

  console.log('val', value, contract)

  return value?.[0]
}
