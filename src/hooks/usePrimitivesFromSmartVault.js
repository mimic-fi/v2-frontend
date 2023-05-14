import { useQueries, useQuery } from 'react-query'
import { request, gql } from 'graphql-request'
import { CHAIN_INFO, CHAIN_SUBGRAPH_URL } from '../constants/chainInfo'
import { useChainId } from './useChainId'
import { useMemo } from 'react'

const usePrimitivesFromSmartVault = (id = '0x', limit = 10, chain = null) => {
  const chainId = useChainId()
  const chainToUse = chainId || chainId










  const chains = useMemo(
    () =>
      Object.values(CHAIN_INFO).filter((item) => {
        return item.isDisabled ? null : item
      }),
    []
  )

  const queriesChain = chains.map(chain => {
    return chain && chain.value
      ? {
        queryKey: ['smart-vault', chain.value, id],
        queryFn: () => fetchSmartVault(chain.value, id),
        select: data => ({ value: chain.value, data }),
      }
      : undefined
  })

  // const { data, isLoading } = useQuery(
  //   ['usePrimitivesFromSmartVault', chainToUse, id],
  //   () => fetchSmartVault(chainToUse, id.toString()),
  //   {
  //     refetchInterval: 10000,
  //   }
  // )

  const chainQueries = useQueries(queriesChain)

  const primitivesChains = useMemo(() => {
    return chainQueries.filter(c => c.data).map(c => {
      return c.data
    }) // eslint-disable-next-line
  }, [id, chainQueries])
console.log('availableChains', primitivesChains)
  // useEffect(() => {
  //   const refetchQueries = chainQueries.filter(q => q.isFetching)
  //   if (refetchQueries.length) {
  //     refetchQueries.forEach(q => q.refetch())
  //   }
  // }, [address, chainQueries])

  // return availableChains







  return useMemo(() => {
    let actions


    // match primitives into actions
    let grouped = primitivesChains?.map(c => {
return c?.data.primitiveExecutions.reduce(function (rv, x) {
  let existingGroup = rv.find(group => group.id === x['transaction']['id'] )
  
  if (existingGroup) {
    existingGroup.data.push(x)
  } else {
    rv.push({
      id: x['transaction']['id'],
      chain: c.value,
      data: [x]
    })
  }

  return rv
}, [])
    }
      
      )
      console.log('grouped', grouped.flat())

    // order actions
    // eslint-disable-next-line
    actions = grouped && grouped?.flat().sort((a, b) => {
      // sort actions
      console.log(b?.data)
      if (b?.data && b?.data[0]?.transaction?.executedAt > a.data[0]?.transaction?.executedAt) return 1
      else if (b?.data && b?.data[0]?.transaction?.executedAt < a.data[0]?.transaction?.executedAt) return -1
      else return 0
    })

    console.log('actions', actions)


    return {
      actions: actions 
    }
  }, [id, primitivesChains])
}

const fetchSmartVault = async (chainId, id) => {
  //TODO: put id in the query. Cause for some reason is failing
  let data = await request(
    CHAIN_SUBGRAPH_URL[chainId],
    gql`
    {
          primitiveExecutions(orderBy: transaction__executedAt, orderDirection: desc, where: {smartVault: ${'"' + id.toLowerCase() + '"'}}){
            id
            type
            data
            transaction {
              id
              executedAt
              target
              sender
              gasUsed
              gasPrice
              costNative
              costUsd
              relayer
              hash
            }
            fee {
              pct
              token {
                id
                name
                symbol
                decimals
              }
              amount
              feeCollector
            }
            movements {
              id
              type
              token {
                id
                name
                symbol
                decimals
              }
              amount
            }
            }
          }

    `
  )
  return data
}

export default usePrimitivesFromSmartVault
