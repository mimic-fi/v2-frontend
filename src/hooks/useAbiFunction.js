import { useCall } from '@usedapp/core'
import { Contract } from '@ethersproject/contracts'

export default function useAbiFunction(contractAddress, abi) {
  console.log('address', contractAddress, abi)
  const { value, error } =
    useCall(
      contractAddress && {
        contract: new Contract(contractAddress, abi),
        method: 'ANY_ADDRESS',
        args: [],
      }
    ) ?? {}
  if (error) {
    console.error(error.message)
    return undefined
  }

  console.log('RESULT', value, error)
  return value?.[0]

}
