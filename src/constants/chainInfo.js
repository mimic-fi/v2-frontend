import ethereumLogoUrl from '../assets/chainLogos/ethereum-logo.svg'
import goerliLogoUrl from '../assets/chainLogos/goerli-logo.svg'
import optimismLogoUrl from '../assets/chainLogos/optimism-logo.svg'
import polygonLogoUrl from '../assets/chainLogos/polygon-logo.svg'
import gnosisLogoUrl from '../assets/chainLogos/gnosis-logo.svg'
import arbitrumLogoUrl from '../assets/chainLogos/arbitrum-logo.svg'

export const SupportedChainId = {
    MAINNET: 1,
    GOERLI: 5,
    OPTIMISM: 10,
    POLYGON: 137,
    GNOSIS: 100,
    ARBITRUM: 42161
  }

export const CHAIN_INFO = {
    [SupportedChainId.MAINNET]: {
      explorer: 'https://etherscan.io/',
      label: 'Ethereum',
      logoUrl: ethereumLogoUrl,
      nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
      color: '#fff',
      value: 1
    },
    [SupportedChainId.GOERLI]: {
      explorer: 'https://goerli.etherscan.io/',
      label: 'Görli',
      logoUrl: goerliLogoUrl,
      nativeCurrency: { name: 'Görli Ether', symbol: 'görETH', decimals: 18 },
      color: '#bb437e',
      value: [SupportedChainId.GOERLI],
    },
    [SupportedChainId.OPTIMISM]: {
      explorer: '',
      label: 'Optimism',
      logoUrl: optimismLogoUrl,
      nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
      color: '#bb437e',
      value: [SupportedChainId.OPTIMISM],
      isDisabled: true
    },
    [SupportedChainId.POLYGON]: {
      explorer: '',
      label: 'Polygon',
      logoUrl: polygonLogoUrl,
      nativeCurrency: { name: 'Görli Ether', symbol: 'görETH', decimals: 18 },
      color: '#bb437e',
      value: [SupportedChainId.POLYGON],
      isDisabled: true
    },
    [SupportedChainId.GNOSIS]: {
      explorer: '',
      label: 'Gnosis',
      logoUrl: gnosisLogoUrl,
      nativeCurrency: { name: 'xDAI', symbol: 'xDAI', decimals: 18 },
      color: '#bb437e',
      value: [SupportedChainId.GNOSIS],
      isDisabled: true
    },
    [SupportedChainId.ARBITRUM]: {
      explorer: '',
      label: 'Arbitrum',
      logoUrl: arbitrumLogoUrl,
      nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
      color: '#bb437e',
      value: [SupportedChainId.ARBITRUM],
      isDisabled: true
    },
  }

