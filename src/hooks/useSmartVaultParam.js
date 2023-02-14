import { useParams, useLocation, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppState } from '../context/appContext'
import { CHAIN_INFO } from '../constants/chainInfo'

export default function useSmartVaultParam() {
  let smartVaultId = ''
  let location = useLocation().pathname
  const navigate = useNavigate()
  const { chainId } = useAppState()
  const { updateChainId } = useAppDispatch()
  const params = useParams()
  const splited = params.id?.toString().split(':')

  if (splited.length === 1) {
    //no network in url: Put the one in the network component
    smartVaultId = splited[0]
    console.log(smartVaultId, splited[0])
    let url = newIdInUrl(params.id, location, chainId, smartVaultId)
    navigate(url)
  } else {
    if (
      splited[0] !== CHAIN_INFO[chainId]?.shortName &&
      isValidChain(splited[0])
    ) {
      //different chains in url and network component: update the component to match url
      updateChainId(isValidChain(splited[0]).value)
    } else if (!isValidChain(splited[0])) {
      //no valid chain shortname in url: replace it for the one in the network component
      let url = newIdInUrl(params.id, location, chainId, splited[1])
      navigate(url)
    }
    smartVaultId = splited[1]
  }

  return smartVaultId
}

function isValidChain(shortName) {
  let chain = Object.values(CHAIN_INFO).find(
    chain => chain.shortName === shortName
  )

  return chain
}

export function newIdInUrl(id, location, chainId, newId) {
  let newLocation = location.split(id)
  let url =
    newLocation[0] +
    CHAIN_INFO[chainId]?.shortName +
    ':' +
    newId +
    newLocation[1]

  return url
}
