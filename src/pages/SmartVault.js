import React from 'react'
import styled from 'styled-components'
import { Container } from '../styles/texts'
import { useParams } from 'react-router-dom'
import moment from 'moment'
import Page from '../components/Page'
import Table from '../components/Table/Table'
import TableRow from '../components/Table/TableRow'
import TableHeader from '../components/Table/TableHeader'
import TableCell from '../components/Table/TableCell'
import Hero from '../sections/Hero'
import { Hm } from '../styles/texts'
import useSmartVaultWithPrimitives from '../hooks/useSmartVaultWithPrimitives'
import useSmartVaultMetadata from '../hooks/useSmartVaultMetadata'

const Primitives = () => {
  //todo: add loader
  const params = useParams()
  const smartVault = useSmartVaultWithPrimitives(params.id)

  const metadata = useSmartVaultMetadata('0xD4E8Ef46Dd296395fF8801D8A4E542Ad108E9716')
  console.log('metadata', metadata)

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
          <TableCell>
            {item.executedAt
              ? moment.unix(item.executedAt).format('MMM Do, h:mm')
              : '-'}
          </TableCell>
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
