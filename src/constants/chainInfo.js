import ethereumLogoUrl from '../assets/networkLogos/ethereum-logo.svg'
import goerliLogoUrl from '../assets/networkLogos/goerli-logo.svg'

export const SupportedChainId = {
    MAINNET: 1,
    GOERLI: 5
  }

export const CHAIN_INFO = {
    [SupportedChainId.MAINNET]: {
      explorer: 'https://etherscan.io/',
      label: 'Ethereum',
      logoUrl: ethereumLogoUrl,
      nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
      color: '#fff',
    },
    [SupportedChainId.GOERLI]: {
      explorer: 'https://goerli.etherscan.io/',
      label: 'Görli',
      logoUrl: goerliLogoUrl,
      nativeCurrency: { name: 'Görli Ether', symbol: 'görETH', decimals: 18 },
      color: '#bb437e',
    },
  }

