import ethereumLogoUrl from '../assets/chainLogos/ethereum-logo.svg'
import goerliLogoUrl from '../assets/chainLogos/goerli-logo.svg'
import optimismLogoUrl from '../assets/chainLogos/optimism-logo.svg'
import polygonLogoUrl from '../assets/chainLogos/polygon-logo.svg'
import gnosisLogoUrl from '../assets/chainLogos/gnosis-logo.svg'
import arbitrumLogoUrl from '../assets/chainLogos/arbitrum-logo.svg'
import zksyncLogoUrl from '../assets/chainLogos/zksync.svg'

export const SupportedChainId = {
  MAINNET: 1,
  GOERLI: 5,
  OPTIMISM: 10,
  POLYGON: 137,
  GNOSIS: 100,
  ARBITRUM: 42161,
  MUMBAI: 80001,
  ZKSYNC: 324
}

export const DEFAULT_CHAIN_ID = SupportedChainId.MAINNET

export const CHAIN_INFO = {
  [SupportedChainId.MAINNET]: {
    explorer: 'https://etherscan.io/',
    name: 'Ethereum',
    logoUrl: ethereumLogoUrl,
    nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
    color: '#fff',
    value: SupportedChainId.MAINNET,
    shortName: 'eth'
  },

  [SupportedChainId.MUMBAI]: {
    explorer: 'https://mumbai.polygonscan.com/',
    name: 'Mumbai',
    logoUrl: polygonLogoUrl,
    nativeCurrency: { name: 'Matic', symbol: 'MATIC', decimals: 18 },
    color: '#de4437',
    value: SupportedChainId.MUMBAI,
    isTestnet: true,
    shortName: 'mumbai'
  },
  [SupportedChainId.OPTIMISM]: {
    explorer: 'https://optimistic.etherscan.io/',
    name: 'Optimism',
    logoUrl: optimismLogoUrl,
    nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
    color: '#bb437e',
    value: SupportedChainId.OPTIMISM,
    shortName: 'opt'
    
  },
  [SupportedChainId.POLYGON]: {
    explorer: 'https://polygonscan.com/',
    name: 'Polygon',
    logoUrl: polygonLogoUrl,
    nativeCurrency: { name: 'Görli Ether', symbol: 'görETH', decimals: 18 },
    color: '#bb437e',
    value: SupportedChainId.POLYGON,
    shortName: 'matic'


  },
  [SupportedChainId.GNOSIS]: {
    explorer: 'https://gnosisscan.io/',
    name: 'Gnosis',
    logoUrl: gnosisLogoUrl,
    nativeCurrency: { name: 'xDAI', symbol: 'xDAI', decimals: 18 },
    color: '#bb437e',
    value: SupportedChainId.GNOSIS,
    shortName: 'gnosis'

  },
  [SupportedChainId.ARBITRUM]: {
    explorer: 'https://arbiscan.io/',
    name: 'Arbitrum',
    logoUrl: arbitrumLogoUrl,
    nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
    color: '#bb437e',
    value: SupportedChainId.ARBITRUM,
    shortName: 'arbitrum'

  },
  [SupportedChainId.ZKSYNC]: {
    explorer: 'https://explorer.zksync.io/',
    name: 'zkSync',
    logoUrl: zksyncLogoUrl,
    shortName: 'zksync',
    nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
    color: '#bb437e',
    value: SupportedChainId.ZKSYNC,
    isDisabled: true,
    
  },
  [SupportedChainId.GOERLI]: {
    explorer: 'https://goerli.etherscan.io/',
    name: 'Görli',
    shortName: 'goerli',
    logoUrl: goerliLogoUrl,
    nativeCurrency: { name: 'Görli Ether', symbol: 'görETH', decimals: 18 },
    color: '#bb437e',
    value: SupportedChainId.GOERLI,
    isTestnet: true
  },
}

export const CHAIN_SUBGRAPH_URL = {
  [SupportedChainId.MAINNET]:
    'https://api.thegraph.com/subgraphs/name/mimic-fi/v2-mainnet',
  [SupportedChainId.GOERLI]:
    'https://api.thegraph.com/subgraphs/name/mimic-fi/v2-goerli',
  [SupportedChainId.MUMBAI]:
    'https://api.thegraph.com/subgraphs/name/mimic-fi/v2-mumbai',
  [SupportedChainId.GNOSIS]:
    'https://api.thegraph.com/subgraphs/name/mimic-fi/v2-gnosis',
  [SupportedChainId.POLYGON]:
    'https://api.thegraph.com/subgraphs/name/mimic-fi/v2-polygon',
  [SupportedChainId.OPTIMISM]:
    'https://api.thegraph.com/subgraphs/name/mimic-fi/v2-optimism',
  [SupportedChainId.ARBITRUM]:
    'https://api.thegraph.com/subgraphs/name/mimic-fi/v2-arbitrum',
}
