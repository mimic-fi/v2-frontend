import { useQuery } from 'react-query'
import { request, gql } from 'graphql-request'

const useSmartVaults = () => {
  return useQuery(['smartVaults'], () => fetchSmartVaults(), {
    refetchInterval: 10000,
  })
}

const fetchSmartVaults = async () => {
  let smartVaults = await request(
    'https://api.thegraph.com/subgraphs/name/mimic-fi/v2-goerli',
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
