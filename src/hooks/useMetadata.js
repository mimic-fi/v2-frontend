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
  // TODO: urlMetadata update domain address, split to enviroment file
  const urlMetadata = `${METADATA_URL}/${type}/${chainId}/${address}`
  const { data } = await axios.get(urlMetadata)
  return data
}

export default useMetadata
