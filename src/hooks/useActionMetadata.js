import { useChainId } from './useChainId'
import useMetadata from './useMetadata'

export default function useActionMetadata(address) {
  const chainId = useChainId()
  const meta = useMetadata('actions', chainId, address)
  return meta
}
