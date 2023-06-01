import { useChainId } from './useChainId'
import useMetadata from './useMetadata'

export default function useActionMetadata(address, chain = null) {
  const chainId = useChainId()
  const meta = useMetadata('actions', chain||chainId, address)
  return meta
}
