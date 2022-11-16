import { useQuery } from 'react-query'
import { request, gql } from 'graphql-request'
<<<<<<< HEAD
=======
import { THEGRAPH_URL } from '../constants/enviroment'
>>>>>>> 9adf4c8cbe6ed1930db732bbdec7a58b56163a10

const useSmartVaults = () => {
  return useQuery(['smartVaults'], () => fetchSmartVaults(), {
    refetchInterval: 10000,
  })
}

const fetchSmartVaults = async () => {
  let smartVaults = await request(
<<<<<<< HEAD
    'https://api.thegraph.com/subgraphs/name/mimic-fi/v2-goerli',
=======
    THEGRAPH_URL,
>>>>>>> 9adf4c8cbe6ed1930db732bbdec7a58b56163a10
    gql`
      {
        smartVaults {
          id
        }
      }
    `
  )
  return smartVaults
}

export default useSmartVaults
