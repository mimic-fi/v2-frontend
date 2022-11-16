import { CHAIN_INFO } from './chainInfo'

export const THEGRAPH_URL = process.env.REACT_APP_THEGRAPH_URL
export const METADATA_URL = process.env.REACT_APP_METADATA_URL

// check if its vercel enviroment
export const isDevelopment = () => !isStaging() && !isProduction()

export const isStaging = () => process.env.REACT_APP_VERCEL_ENV === 'preview'

export const isProduction = () => process.env.REACT_APP_VERCEL_ENV === 'production'

export const getChainId = () => process.env.REACT_APP_CHAIN_ID || 1

export function getChainInfo() {
  const chainId = getChainId()
  if (chainId) {
    return CHAIN_INFO[chainId] ?? undefined
  }
  return undefined
}