import { getChainId } from '../constants/enviroment'
import useMetadata from './useMetadata'

export default function useActionMetadata(address) {
  const chainId = getChainId()
  const meta = useMetadata('actions', chainId, address)
  return meta
}
