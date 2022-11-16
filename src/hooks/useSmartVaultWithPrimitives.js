import { useQuery } from 'react-query'
import { request, gql } from 'graphql-request'
import { THEGRAPH_URL } from '../constants/enviroment'

const useSmartVaultWithPrimitives = (id = '0x') => {
  return useQuery(
    ['useSmartVaultWithPrimitives', id],
    () => fetchSmartVault(id.toString()),
    {
      refetchInterval: 10000,
    }
  )
}

const fetchSmartVault = async id => {
  //TODO: put id in the query. Cause for some reason is failing
  let smartVault = await request(
    THEGRAPH_URL,
    gql`
    {
        smartVault(id: ${'"' + id.toLowerCase() + '"'}) {
          id
          primitiveExecutions {
            id
            type
            executedAt
            transaction

          }
        }
      }
    `
  )
  return smartVault
}

export default useSmartVaultWithPrimitives
