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
import SmartVaultNotFound from '../sections/SmartVaultNotFound'
import SmartVaultDetail from '../sections/SmartVaultDetail'
import { Hm } from '../styles/texts'
import useSmartVaultWithPrimitives from '../hooks/useSmartVaultWithPrimitives'

const SmartVault = () => {
  const params = useParams()
  const smartVault = useSmartVaultWithPrimitives(params.id)

  return (
    <Page>
      {smartVault.isLoading ?
        <Loading>
          Loading Smart Vault...
        </Loading>
        : !smartVault?.id ?
          <SmartVaultNotFound id={params.id} />
          :
          <RenderContentPage smartVault={smartVault} />
      }
    </Page>
  )
}

const RenderContentPage = ({ smartVault }) => {
  const [width, setWidth] = useState(window.innerWidth)
  useEffect(() => {
    window.addEventListener('resize', () => setWidth(window.innerWidth))
  }, [])
  const medium = 700
  const large = 900
  
  return (
    <>
      {!smartVault.isLoading && (
        <Container>
          <Hero
            isLoading={smartVault.isLoading}
            lastAction={smartVault.lastAction}
            totalValueManaged={smartVault.totalValueManaged}
          />
        </Container>
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
            {smartVault.isLoading ? 'Loading actions...' :
              smartVault?.actions?.map((primitives, i) => {
                return <Action key={primitives[0]} primitives={primitives[1]} index={i + 1} />
              })
            }
          </Table>
        </Container>
      </LatestActionsSection>
      <SmartVaultDetail address={smartVault?.id} />
    </>
  )
}
const LatestActionsSection = styled.section`
  height: auto;
  padding: 80px 0;
  color: white;
  width: 100%;
  margin: auto;
`

const Loading = styled.div`
  height: 70vh;
  color: white;
  font-size: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;

`

export default SmartVault
