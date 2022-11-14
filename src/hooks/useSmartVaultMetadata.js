import useMetadata from './useMetadata'

export default function useSmartVaultMetadata(address) {
  const chainId = 5 // TODO: global chainId
  const meta = useMetadata('smart-Vaults', chainId, address)
  return meta
}
