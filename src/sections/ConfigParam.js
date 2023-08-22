import React from 'react'
import useContractParams from '../hooks/useContractParams'
import TableRow from '../components/Table/TableRow'
import TableCell from '../components/Table/TableCell'
import { tokens } from '../constants/tokens'
import { convertWeiToGwei } from '../utils/web3-utils'

const ConfigParam = ({ abiFunction, abi, contractAddress }) => {
  let value = useContractParams(
    contractAddress,
    abi,
    abiFunction.name.toString()
  )

  value = value?.toString()

  if (abiFunction.name === 'thresholdToken' && value) {
    const token = tokens.filter(element => {
      return element?.address?.toUpperCase() === value?.toUpperCase()
    })
    if (token.length > 0) {
      value = token[0].name
    }
  }

  if (abiFunction.name === 'maxSlippage' && value) {
    value = convertWeiToGwei(value) + ' gwei'
  }

  if (value === 'true' || value === true) {
    value = (
      <span role="img" aria-label="Check">
        ✅
      </span>
    )
  }

  if (value === 'false' || value === false) {
    value = (
      <span role="img" aria-label="Check">
        ❌
      </span>
    )
  }

  return (
    <TableRow>
      <TableCell align="left">{abiFunction.name}</TableCell>
      <TableCell align="left">{value}</TableCell>
    </TableRow>
  )
}

export default ConfigParam
