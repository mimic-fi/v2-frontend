import React from 'react'
import { Hs } from '../styles/texts'
import Table from '../components/Table/Table'
import ConfigParam from './ConfigParam'
import useAbiFromEtherscan from '../hooks/useAbiFromEtherscan'

const ContractParams = ({ id, name }) => {
  const { abi, functions } = useAbiFromEtherscan(id)
  console.log('abi', abi, functions)
  return (
    <>
      {functions && (
        <>
          <Hs>{name} params</Hs>
          <br />
          <Table>
            {functions?.map((f, i) => {
              return (
                <ConfigParam
                  key={i}
                  abiFunction={f}
                  abi={abi}
                  contractAddress={id}
                />
              )
            })}
          </Table>
        </>
      )}
    </>
  )
}

export default ContractParams
