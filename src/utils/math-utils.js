import JSBI from 'jsbi'

export const NO_BREAK_SPACE = '\u00a0'

export function formatTokenAmount(
  amount,
  decimals = 0,
  { digits = 2, symbol = '', displaySign = false }
) {
  if(!amount) return 0
  amount = JSBI.BigInt(String(amount))
  decimals = JSBI.BigInt(String(decimals))
  digits = JSBI.BigInt(String(digits))

  const _0 = JSBI.BigInt(0)
  const _10 = JSBI.BigInt(10)

  if (JSBI.lessThan(decimals, _0)) {
    throw new Error('formatTokenAmount(): decimals cannot be negative')
  }

  if (JSBI.lessThan(digits, _0)) {
    throw new Error('formatTokenAmount(): digits cannot be negative')
  }

  if (JSBI.lessThan(decimals, digits)) {
    digits = decimals
  }

  const negative = JSBI.lessThan(amount, _0)

  if (negative) {
    amount = JSBI.unaryMinus(amount)
  }

  const amountConverted = JSBI.equal(decimals, _0)
    ? amount
    : JSBI.BigInt(
        divideRoundBigInt(
          amount,
          JSBI.exponentiate(_10, JSBI.subtract(decimals, digits))
        )
      )

  const leftPart = formatNumber(
    JSBI.divide(amountConverted, JSBI.exponentiate(_10, digits))
  )

  const rightPart = String(
    JSBI.remainder(amountConverted, JSBI.exponentiate(_10, digits))
  )
    .padStart(digits, '0')
    .replace(/0+$/, '')

  return [
    displaySign ? (negative ? '-' : '+') : '',
    leftPart,
    rightPart ? `.${rightPart}` : '',
    symbol ? `${NO_BREAK_SPACE}${symbol}` : '',
  ].join('')
}


export function formatNumber(number) {
  const numAsString = String(number)
  const [integer, decimals] = numAsString.split('.')

  return [...integer].reverse().reduce(
    (result, digit, index) => {
      return digit + (index > 0 && index % 3 === 0 ? ',' : '') + result
    },
    decimals ? `.${decimals}` : ''
  )
}

export function divideRoundBigInt(dividend, divisor) {
  dividend = JSBI.BigInt(String(dividend))
  divisor = JSBI.BigInt(String(divisor))
  return JSBI.divide(
    JSBI.add(dividend, JSBI.divide(divisor, JSBI.BigInt(2))),
    divisor
  ).toString()
}
