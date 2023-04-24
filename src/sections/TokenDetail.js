import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import TableCell from '../components/Table/TableCell'
import { useTokenPrice } from '../hooks/useTokenPrice'

const TokenDetail = ({ balance, tokenAddress }) => {
  const tokenPrice = useTokenPrice(tokenAddress)
  const [width, setWidth] = useState(window.innerWidth)
  useEffect(() => {
    window.addEventListener('resize', () => setWidth(window.innerWidth))
  }, [])
  const medium = 700
  const large = 900

  return (
    <>
      <TableCell align="left">
        {tokenPrice && '$ ' + Number(tokenPrice.usd).toFixed(2)}
      </TableCell>
      {tokenPrice && tokenPrice.usd_24h_change ? (
        width >= medium && (
          <StyledCell>
            <span className={tokenPrice.usd_24h_change > 0 ? 'green' : 'red'}>
              {Number(tokenPrice.usd_24h_change).toFixed(2)}%
            </span>
          </StyledCell>
        )
      ) : (
        <TableCell />
      )}

      <TableCell align="left">{balance}</TableCell>
      <TableCell align="left">
        {tokenPrice &&
          '$ ' +
            (
              Number(parseFloat(balance)) * Number(parseFloat(tokenPrice.usd))
            ).toFixed(2)}
      </TableCell>
    </>
  )
}

const StyledCell = styled(TableCell)`
  .green {
    color: #61b79e;
  }

  .red {
    color: #c14a59;
  }
`

export default TokenDetail
