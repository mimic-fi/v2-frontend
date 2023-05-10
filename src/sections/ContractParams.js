import React from 'react'
import useContractAbi from '../hooks/useContractAbi'
import Table from '../components/Table/Table'
import Function from './Function'

const ContractParams = ({ id }) => {
  const { abi, functions } = useContractAbi(id)
  return (
    <Table>
      {functions?.map((f, i) => {
        return (
          <Function key={i} abiFunction={f} abi={abi} contractAddress={id} />
        )
      })}
    </Table>
  )
}

export default ContractParams
