import { useState, useEffect } from 'react'

export function useTokenPrice(tokenAddress) {
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

  return tokenPrice
}
