import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import TableCell from '../components/Table/TableCell'

const TokenDetail = ({ balance, tokenAddress }) => {
  const [tokenPrice, setPrice] = useState(null)

  useEffect(
    () => {
      const fetchTokenPrice = async () => {
        try {
          const response = await fetch(
            `https://api.coingecko.com/api/v3/simple/token_price/ethereum?contract_addresses=${tokenAddress}&vs_currencies=usd&include_24hr_change=true`
          )
          if (!response.ok) {
            throw new Error('Error al obtener el precio del token')
          }

          const data = await response.json()
          setPrice(data[tokenAddress.toLowerCase()])
        } catch (err) {
          console.error(err)
        }
      }

      fetchTokenPrice()
    },
    [tokenAddress]
  )

  return (
    <>
      <TableCell align="left">
        {tokenPrice && '$ ' + Number(tokenPrice.usd).toFixed(2)}
      </TableCell>
      {tokenPrice && tokenPrice.usd_24h_change ? (
        <StyledCell>
          <span
            className={tokenPrice.usd_24h_change > 0 ? 'green' : 'red'}
          >
            {Number(tokenPrice.usd_24h_change).toFixed(2)}%
          </span>
        </StyledCell>
      ) : (
        <TableCell />
      )}

      <TableCell align="left">{balance}</TableCell>
      <TableCell align="left">
        {tokenPrice &&
          '$ ' + (Number(parseFloat(balance)) * Number(parseFloat(tokenPrice.usd))).toFixed(2)}
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
