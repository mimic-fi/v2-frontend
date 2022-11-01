import React from 'react'
import styled from 'styled-components'
import { Container } from '../styles/texts'
import useSmartVaultWithPrimitives from '../hooks/useSmartVaultWithPrimitives'

const Primitives = () => {
  //todo: add loader
  //todo: get value from url
  const smartVault = useSmartVaultWithPrimitives(
    '0xd4e8ef46dd296395ff8801d8a4e542ad108e9716'
  )

  let itemsToRender
  if (smartVault && smartVault.data && smartVault.data.wallet) {
    itemsToRender = smartVault.data.wallet.primitiveExecutions.map(item => {
      return (
        <div key={item.id}>
          <h2>{item.type}: {item.id}</h2>
        </div>
      )
    })
  }

  return (
    <PrimitivesSection>
      <Container>
        <h1>primitives section</h1>
        {itemsToRender}
      </Container>
    </PrimitivesSection>
  )
}

const PrimitivesSection = styled.section`
  background: #121418;
  height: auto;
  min-height: 1700px;
  padding-top: 80px;
  color: white;
  @media only screen and (max-width: 700px) {
    min-height: 650px;
    padding: 60px 0 0 0;
  }
  h2 {
    color: violet;
  }
`

export default Primitives
