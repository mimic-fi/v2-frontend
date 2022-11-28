import { useChainId } from './useChainId'
import useMetadata from './useMetadata'

export default function useSmartVaultMetadata(address) {
  const chainId = useChainId()
  const meta = useMetadata('smart-vaults', chainId, address)
  return meta
}
