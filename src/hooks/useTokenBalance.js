import { useMemo } from 'react'
import { ERC20, useContractCalls } from '@usedapp/core'
import { Interface } from '@ethersproject/abi'
import { formatTokenAmount } from '../utils/math-utils'
import { tokens } from '../constants/tokens'

export function useTokensBalance(smartVaultAddress = null, chain = null) {
  const allTokens = tokens.filter(element => {
    return element.chainId === chain
  })
  const ERC20Interface = new Interface(ERC20.abi)

  const results = useContractCalls(
    allTokens.map(t => ({
      abi: ERC20Interface,
      address: t.address,
      method: 'balanceOf',
      args: [smartVaultAddress],
    })),
    { chainId: chain }
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
        balances[token.symbol].balance =
          results[idx] && results[idx][0] && format(results[idx][0])
        return balances[token.symbol]
      })
      return balances
    },
    [results, allTokens]
  ) // eslint-disable-line
}
