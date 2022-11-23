import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Container } from '../styles/texts'
import { useParams } from 'react-router-dom'
import Page from '../components/Page'
import Table from '../components/Table/Table'
import TableRow from '../components/Table/TableRow'
import TableHeader from '../components/Table/TableHeader'
import Hero from '../sections/Hero'
import Action from '../sections/Action'
import SmartVaultDetail from '../sections/SmartVaultDetail'
import { Hm } from '../styles/texts'
import useSmartVaultWithPrimitives from '../hooks/useSmartVaultWithPrimitives'

const SmartVault = () => {
  //todo: add loader
  const [width, setWidth] = useState(window.innerWidth)
  useEffect(() => {
    window.addEventListener('resize', () => setWidth(window.innerWidth))
  }, [])
  const medium = 700
  const large = 900

  const params = useParams()
  let heroPrimitive = ''
  let totalValueManaged = ''
  let totalActions = 0
  const smartVault = useSmartVaultWithPrimitives(params.id)

  let actions
  if (smartVault && smartVault.data && smartVault.data.smartVault) {
    totalValueManaged = smartVault.data.smartVault.totalValueManaged
    let data = smartVault.data.smartVault.primitiveExecutions
    let grouped = data.reduce(function(rv, x) {
      ;(rv[x['transaction']] = rv[x['transaction']] || []).push(x)
      return rv
    }, {})
    actions = Object.values(grouped).map(primitives => {
      totalActions += 1
      return <Action primitives={primitives} key={primitives.id} />
    })
    heroPrimitive = Object.values(grouped)[0][0]
  }

  return (
    <Page>
      {heroPrimitive && (
        <Hero
          primitive={heroPrimitive}
          totalValueManaged={totalValueManaged}
          totalActions={totalActions}
        />
      )}
      <LatestActionsSection>
        <Container>
          <Hm>Latest actions</Hm>
          <Table
            header={
              <TableRow>
                <TableHeader title="Date" align="left" />
                <TableHeader title="Action" align="left" />
                {width >= large && (
                  <TableHeader title="Description" align="left" />
                )}
                {width >= medium && (
                  <TableHeader title="Excecuted by" align="left" />
                )}
                <TableHeader title="Status" align="center" />
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
  padding: 80px 20px;
  color: white;
  max-width: 1100px;
  margin: auto;
`

export default SmartVault
