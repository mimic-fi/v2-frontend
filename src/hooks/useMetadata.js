import { useQuery } from 'react-query'
import axios from 'axios'
<<<<<<< HEAD
=======
import { METADATA_URL } from '../constants/enviroment'
>>>>>>> 9adf4c8cbe6ed1930db732bbdec7a58b56163a10

const useMetadata = (type = null, chainId = 1, address = null) => {
  return useQuery(
    ['metadata', type, chainId, address], // data cached with unique id
    () => fetchMetadata(type, chainId, address)
  )
}

const fetchMetadata = async (type, chainId, address) => {
  // TODO: urlMetadata update domain address, split to enviroment file
<<<<<<< HEAD
  const urlMetadata = `https://cdn.statically.io/gh/mimic-fi/v2-metadata/master/build/${type}/${chainId}/${address}`
=======
  const urlMetadata = `${METADATA_URL}/${type}/${chainId}/${address}`
>>>>>>> 9adf4c8cbe6ed1930db732bbdec7a58b56163a10
  console.log('url', urlMetadata)
  const { data } = await axios.get(urlMetadata)
  return data
}

export default useMetadata
