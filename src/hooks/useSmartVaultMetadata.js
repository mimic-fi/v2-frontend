<<<<<<< HEAD
import useMetadata from './useMetadata'

export default function useSmartVaultMetadata(address) {
  const chainId = 5 // TODO: global chainId
=======
import { getChainId } from '../constants/enviroment'
import useMetadata from './useMetadata'

export default function useSmartVaultMetadata(address) {
  const chainId = getChainId()
>>>>>>> 9adf4c8cbe6ed1930db732bbdec7a58b56163a10
  const meta = useMetadata('smart-vaults', chainId, address)
  return meta
}
