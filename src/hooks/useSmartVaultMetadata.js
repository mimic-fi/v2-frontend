import { getChainId } from '../constants/enviroment'
import useMetadata from './useMetadata'

export default function useSmartVaultMetadata(address) {
  const chainId = getChainId()
  const meta = useMetadata('smart-vaults', chainId, address)
  return meta
}
