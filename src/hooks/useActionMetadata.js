import useMetadata from './useMetadata'

export default function useActionMetadata(address) {
  const chainId = 5 // TODO: global chainId
  const meta = useMetadata('actions', chainId, address)
  return meta
}
