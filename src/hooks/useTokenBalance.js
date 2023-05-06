import { useMemo } from 'react'
import { useCalls, ERC20Interface } from '@usedapp/core'
import { Contract } from 'ethers'
import { formatTokenAmount } from '../utils/math-utils'
import { tokens } from '../constants/tokens'

export function useTokensBalance(smartVaultAddress = null, chain = null) {
  const chainTokens = tokens.filter(element => {
    return element.chainId === chain
  })

  const calls = chainTokens.map(t => ({
    contract: new Contract(t?.address, ERC20Interface),
    method: 'balanceOf',
    args: [smartVaultAddress],
  })) ?? []

  const results = useCalls(calls, { chainId: chain })

  return useMemo(
    () => {
      let balances = {}
      chainTokens.forEach((token, idx) => {
        balances[token.symbol] = token
        const format = value =>
          formatTokenAmount(value, token.decimals, {
            digits: 2,
          })
        balances[token.symbol].balance =
          results[idx] && results[idx]?.value?.balance && format(results[idx]?.value?.balance)
        return balances[token.symbol]
      })
      return Object.values(balances).filter(
        token => token.balance !== '0' && token.balance !== undefined
      ).sort((a, b) => b.balance - a.balance)
    },
    [results, chainTokens]
  )
}
