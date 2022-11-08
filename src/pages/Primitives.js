import React from 'react'
import styled from 'styled-components'
import { Container } from '../styles/texts'
import Page from '../components/Page'
import useSmartVaultWithPrimitives from '../hooks/useSmartVaultWithPrimitives'

const Primitives = () => {
  //todo: add loader
  //todo: get value from url
  const smartVault = useSmartVaultWithPrimitives(
    '0xdedea106184907836ccd2e8f1a1dba0365e2c0d5'
  )

  let itemsToRender
  if (smartVault && smartVault.data && smartVault.data.smartVault) {
    let data = smartVault.data.smartVault.primitiveExecutions
    let grouped = data.reduce(function(rv, x) {
      ;(rv[x['transaction']] = rv[x['transaction']] || []).push(x)
      return rv
    }, {})

    console.log('g', grouped)
    
    itemsToRender = data.map(item => {
      return (
        <div key={item.id}>
          <h2>
            {item.type}: {item.id}
          </h2>
        </div>
      )
    })
  }

  return (
    <Page>
      <PrimitivesSection>
        <Container>
          <h1>primitives section</h1>
          {itemsToRender}
        </Container>
      </PrimitivesSection>
    </Page>
  )
}

const PrimitivesSection = styled.section`
  background: #121418;
  height: auto;
  padding-top: 80px;
  color: white;
  h2 {
    color: violet;
    max-width: 80%;
    word-wrap: break-word;
  }
`

export default Primitives
