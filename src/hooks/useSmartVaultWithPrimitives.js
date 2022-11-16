import { useQuery } from 'react-query'
import { request, gql } from 'graphql-request'
<<<<<<< HEAD
=======
import { THEGRAPH_URL } from '../constants/enviroment'
>>>>>>> 9adf4c8cbe6ed1930db732bbdec7a58b56163a10

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
<<<<<<< HEAD
    'https://api.thegraph.com/subgraphs/name/mimic-fi/v2-goerli',
=======
    THEGRAPH_URL,
>>>>>>> 9adf4c8cbe6ed1930db732bbdec7a58b56163a10
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
