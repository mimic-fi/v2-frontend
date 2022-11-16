import React from 'react'
import styled from 'styled-components'
import { Container } from '../styles/texts'
import { useParams } from 'react-router-dom'
import Page from '../components/Page'
import Action from '../components/Action'
import Table from '../components/Table/Table'
import TableRow from '../components/Table/TableRow'
import TableHeader from '../components/Table/TableHeader'
import Hero from '../sections/Hero'
import SmartVaultDetail from '../sections/SmartVaultDetail'
import { Hm } from '../styles/texts'
import useSmartVaultWithPrimitives from '../hooks/useSmartVaultWithPrimitives'

const SmartVault = () => {
  //todo: add loader
  const params = useParams()
  const smartVault = useSmartVaultWithPrimitives(params.id)

  let actions
  if (smartVault && smartVault.data && smartVault.data.smartVault) {
    let data = smartVault.data.smartVault.primitiveExecutions
    let grouped = data.reduce(function(rv, x) {
      ;(rv[x['transaction']] = rv[x['transaction']] || []).push(x)
      return rv
    }, {})
    actions = Object.values(grouped).map(primitives => {
      return <Action primitives={primitives} key={primitives.id} />
    })
  }

  return (
    <Page>
      <Hero />
      <LatestActionsSection>
        <Container>
          <Hm>Latest actions</Hm>
          <Table
            header={
              <TableRow>
                <TableHeader title="Date" />
                <TableHeader title="Action" />
                <TableHeader title="Excecuted by" />
                <TableHeader title="Status" />
              </TableRow>
            }
          >
            {actions}
          </Table>
        </Container>
      </LatestActionsSection>
      <SmartVaultDetail />
    </Page>
  )
}

const LatestActionsSection = styled.section`
  height: auto;
  padding: 80px 0;
  color: white;
`

export default SmartVault
