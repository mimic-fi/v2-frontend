import React from 'react'
import { Hs, BodyL } from '../styles/texts'
import Table from '../components/Table/Table'
import Function from './Function'
import useAbiFromEtherscan from '../hooks/useAbiFromEtherscan'


const ContractParams = ({ id, name }) => {
  const { abi, functions } = useAbiFromEtherscan(id)
  return (
    <>
    <Hs>{name} params</Hs>
    <br />
    <Table>
      {functions?.map((f, i) => {
        return (
          <Function key={i} abiFunction={f} abi={abi} contractAddress={id} />
        )
      })}
    </Table>
    </>
  )
}

export default ContractParams
