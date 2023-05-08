import { useQuery } from 'react-query'
import axios from 'axios'
import { METADATA_URL } from '../constants/enviroment'

const useMetadata = (type = null, chainId = 1, address = null) => {
  return useQuery(
    ['metadata', type, chainId, address], // data cached with unique id
    () => fetchMetadata(type, chainId, address)
  )
}

const fetchMetadata = async (type, chainId, address) => {
  if (!address) return []
  const urlMetadata = `${METADATA_URL}/${type}/${chainId}/${address}`

  try {
    const { data } = await axios.get(urlMetadata)
    return data
  } catch (error) {
    if (error.response && error.response.status === 404) {
      console.log(`- ${address} ${type} no metadata.`)
      return false 
    }
    throw error // Rethrow other errors
  }
  
}

export default useMetadata
