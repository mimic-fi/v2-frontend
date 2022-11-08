import React from 'react'
import styled from 'styled-components'
import { Container } from '../styles/texts'
import Page from '../components/Page'
import Table from '../components/Table/Table'
import TableRow from '../components/Table/TableRow'
import TableHeader from '../components/Table/TableHeader'
import TableCell from '../components/Table/TableCell'
import Hero from '../sections/Hero'
import { Hm } from '../styles/texts'
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
        <TableRow key={item.id}>
          <TableCell>{item.type}</TableCell>
          <TableCell>{item.executedAt}</TableCell>
        </TableRow>
      )
    })
  }

  return (
    <Page>
      <Hero />
      <PrimitivesSection>
        <Container>
          <Hm>Latest actions</Hm>
          <Table
            header={
              <TableRow>
                <TableHeader title="Type" />
                <TableHeader title="Date" />
              </TableRow>
            }
          >
            {itemsToRender}
          </Table>

        </Container>
      </PrimitivesSection>
    </Page>
  )
}

const PrimitivesSection = styled.section`
  height: auto;
  padding: 80px 0;
  color: white;
`

export default Primitives
