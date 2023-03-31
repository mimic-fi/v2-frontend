import { useMemo } from 'react'
import { ERC20, useContractCalls, useEthers } from '@usedapp/core'
import { Interface } from '@ethersproject/abi'
import { formatTokenAmount } from '../utils/math-utils'
import { tokens } from '../constants/tokens'

export function useTokensBalance(smartVaultAddress = null) {
  const { chainId } = useEthers()

  const allTokens = tokens.filter(element => {
    return element.chainId === chainId
  })

  const ERC20Interface = new Interface(ERC20.abi)

  const results = useContractCalls(
    allTokens && smartVaultAddress
      ? allTokens.map(t => ({
          abi: ERC20Interface,
          address: t.address,
          method: 'balanceOf',
          args: [smartVaultAddress],
        }))
      : []
  )
  return useMemo(
    () => {
      let balances = {}
      allTokens.forEach((token, idx) => {
        balances[token.symbol] = token
        const format = value =>
          formatTokenAmount(value, token.decimals, {
            digits: 2,
          })
        balances[token.symbol].balance = results[idx] && results[idx][0] && format(results[idx][0])
        return balances[token.symbol]
      })
      return balances
    },
    [results]
  ) // eslint-disable-line
}
