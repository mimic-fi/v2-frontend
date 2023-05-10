import React from 'react'
import useAbiFunction from '../hooks/useAbiFunction'
import TableRow from '../components/Table/TableRow'
import TableCell from '../components/Table/TableCell'

const Function = ({ abiFunction, abi, contractAddress }) => {
  const name = abiFunction.name

  const value = useAbiFunction(contractAddress, abi)

  console.log('val', value)

  return (
    <TableRow>
      <TableCell align="left">{name}</TableCell>
      <TableCell align="left">{}</TableCell>
    </TableRow>
  )
}

export default Function
