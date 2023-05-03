import { useQuery } from 'react-query'
import { request, gql } from 'graphql-request'
import { CHAIN_SUBGRAPH_URL } from '../constants/chainInfo'
import { useChainId } from './useChainId'

const useActionPermissions = (id = '0x') => {
  const chainId = useChainId()

  return useQuery(['useActionPermissions', chainId, id], () =>
    fetchActionPermissions(chainId, id.toString())
  )
}

const fetchActionPermissions = async (chainId, id) => {
  let { action } = await request(
    CHAIN_SUBGRAPH_URL[chainId],
    gql`
    {
        action(id: ${'"' + id.toLowerCase() + '"'}) {
          id
          permissions {
            grantees {
              id
              permissions {
                target{ id }
                method
              }
            }
          }
        }
      }

    `
  )
  return action
}

export default useActionPermissions
