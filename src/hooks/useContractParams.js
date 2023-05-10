import { useCall } from '@usedapp/core'
import { useChainId } from './useChainId'
import { Contract } from '@ethersproject/contracts'

export default function useContractParams(contractAddress, abi, functionName) {
  const chainId = useChainId()
  const contract = new Contract(contractAddress, abi)
  console.log(abi)
  const { value } =
    useCall(
      contractAddress && {
        contract: contract,
        method: functionName,
        args: [],
      },
      { chainId: chainId }
    ) ?? {}

  return value?.[0]
}
