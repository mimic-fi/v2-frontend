import { useQuery } from 'react-query'
import { request, gql } from 'graphql-request'
import { THEGRAPH_URL } from '../constants/enviroment'

const useSmartVaults = () => {
  return useQuery(['smartVaults'], () => fetchSmartVaults(), {
    refetchInterval: 10000,
  })
}

const fetchSmartVaults = async () => {
  let smartVaults = await request(
    THEGRAPH_URL,
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
