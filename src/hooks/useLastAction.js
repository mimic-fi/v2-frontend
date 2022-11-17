import { useQuery } from 'react-query'
import { request, gql } from 'graphql-request'

const useLastAction = (id = '0x') => {
  return useQuery(
    ['useLastAction', id],
    () => fetchSmartVault(id.toString()),
    {
      refetchInterval: 10000,
    }
  )
}

const fetchSmartVault = async id => {
  //TODO: put id in the query. Cause for some reason is failing
  let smartVault = await request(
    'https://api.thegraph.com/subgraphs/name/mimic-fi/v2-goerli',
    gql`
    {
        smartVault(id: ${'"' + id.toLowerCase() + '"'}) {
          id
          primitiveExecutions(first: 1, orderBy: executedAt, orderDirection: desc) {
            id
            type
            executedAt
            transaction
            target
            sender
          }
        }
      }
    `
  )
  return smartVault
}

export default useLastAction
