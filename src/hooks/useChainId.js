import { useAppState } from '../context/appContext'

export function useChainId() {
  const { chainId } = useAppState()
  return chainId
}