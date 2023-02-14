import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Container } from '../styles/texts'
import { Link, useParams } from 'react-router-dom'
import Page from '../components/Page'
import Subnavbar from '../components/Subnavbar'
import Table from '../components/Table/Table'
import TableRow from '../components/Table/TableRow'
import TableHeader from '../components/Table/TableHeader'
import Hero from '../sections/Hero'
import Action from '../sections/Action'
import SmartVaultNotFound from '../sections/SmartVaultNotFound'
import SmartVaultDetail from '../sections/SmartVaultDetail'
import { Hxl, LinkL } from '../styles/texts'
import { Loading } from '../styles/general'
import split from '../assets/split.svg'
import useSmartVaultWithPrimitives from '../hooks/useSmartVaultWithPrimitives'
import useSmartVaultParam from '../hooks/useSmartVaultParam'
import { CHAIN_INFO } from '../constants/chainInfo'

const SmartVault = () => {
  const id = useSmartVaultParam()
  const smartVault = useSmartVaultWithPrimitives(id, 10)

  return (
    <Page>
      {smartVault.isLoading ? (
        <Loading>Loading Smart Vault...</Loading>
      ) : !smartVault?.id ? (
        <SmartVaultNotFound id={id} />
      ) : (
        <RenderContentPage smartVault={smartVault} />
      )}
    </Page>
  )
}

const RenderContentPage = ({ smartVault }) => {
  const id = useSmartVaultParam()
  const [width, setWidth] = useState(window.innerWidth)
  useEffect(() => {
    window.addEventListener('resize', () => setWidth(window.innerWidth))
  }, [])
  const medium = 700
  const large = 900

  return (
    <>
      {!smartVault.isLoading && (
        <>
          <Subnavbar active="overview" address={smartVault.id} />
          <Container>
            <Hero
              address={smartVault.id || id}
              isLoading={smartVault.isLoading}
              lastAction={smartVault.lastAction}
              totalValueManaged={smartVault.totalValueManaged}
            />
          </Container>
          <Split src={split} />
        </>
      )}
      <LatestActionsSection>
        <Container>
          <Hxl>
            Most recent
            <br />
            actions
          </Hxl>
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
            {smartVault.isLoading ? (
              'Loading actions...'
            ) : (
              <>
                {smartVault?.actions?.map((primitives, i) => {
                  return (
                    <Action
                      key={primitives[0]}
                      primitives={primitives[1]}
                      index={i + 1}
                    />
                  )
                })}
                {smartVault?.actions?.length === 0 && 'No actions'}
              </>
            )}
          </Table>
          <StyledLink to="./action-history">
            <LinkL>Swim to full history</LinkL>
          </StyledLink>
        </Container>
      </LatestActionsSection>
      <SmartVaultDetail address={smartVault?.id || id} />
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
const Split = styled.img`
  width: 100%;
`

const StyledLink = styled(Link)`
  margin: 36px auto;
  text-align: center;
`

export default SmartVault
