import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useParams, Link } from 'react-router-dom'
import Page from '../components/Page'
import Subnavbar from '../components/Subnavbar'
import Table from '../components/Table/Table'
import TableRow from '../components/Table/TableRow'
import TableHeader from '../components/Table/TableHeader'
import Hero from '../sections/Hero'
import Action from '../sections/Action'
import SmartVaultNotFound from '../sections/SmartVaultNotFound'
import SmartVaultDetail from '../sections/SmartVaultDetail'
import AssetsManaged from '../sections/AssetsManaged'
import MoreActions from '../sections/MoreActions'
import { Skeleton } from '../styles/general'
import { Hxl, LinkL, Container } from '../styles/texts'
import split from '../assets/split.svg'
import useSmartVault from '../hooks/useSmartVault'
import useSmartVaultParam from '../hooks/useSmartVaultParam'
import usePrimitivesFromSmartVault from '../hooks/usePrimitivesFromSmartVault'

const SmartVault = ({ chain }) => {
  const id = useSmartVaultParam()
  const params = useParams()
  const smartVault = useSmartVault(id, 10)
  const smartVaultActions = usePrimitivesFromSmartVault(id, 10)

  const [width, setWidth] = useState(window.innerWidth)
  useEffect(() => {
    window.addEventListener('resize', () => setWidth(window.innerWidth))
  }, [])
  const medium = 700
  const large = 900
  return (
    <Page>
      {!smartVault.isLoading && !smartVault?.data.id ? (
        <SmartVaultNotFound id={id} />
      ) : (
        <>
          <Subnavbar active="overview" address={params.id ? params.id : id} />
          <Container>
            <Hero
              address={id}
              isLoading={smartVault.isLoading}
              lastAction={smartVaultActions?.lastAction}
              totalValueManaged={
                smartVault.isLoading
                  ? undefined
                  : smartVault.data.totalValueManaged
              }
            />
          </Container>
          <Split src={split} />
          <LatestActionsSection>
            <Container>
              <Hxl>
                Most recent
                <br />
                actions
              </Hxl>
              {smartVaultActions.isLoading ? (
                <>
                  <br />
                  <br />
                  <Skeleton height="830px" width="100%" marginBottom="30px" />
                </>
              ) : (
                <Table
                  header={
                    <TableRow>
                      <TableHeader title="#" align="left" />
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
                  {smartVaultActions?.actions?.map((primitives, i) => {
                    return (
                      <Action
                        key={primitives[0]}
                        primitives={primitives[1]}
                        index={i + 1}
                      />
                    )
                  })}
                  {smartVaultActions?.actions?.length === 0 && 'No actions'}
                </Table>
              )}
              <StyledLink to="./action-history">
                <LinkL>Swim to full history</LinkL>
              </StyledLink>
            </Container>
          </LatestActionsSection>
          <AssetsManaged address={smartVault?.id || id} chain={chain} />
          <SmartVaultDetail address={smartVault?.id || id} />
          <MoreActions actions={smartVault?.data?.actions} />
        </>
      )}
    </Page>
  )
}

const LatestActionsSection = styled.section`
  height: auto;
  padding: 80px 0;
  @media only screen and (min-width: 700px) {
    padding-top: 430px;
  }
  color: white;
  width: 100%;
  margin: auto;
`
const Split = styled.img`
  width: 100%;
  position: absolute;
`

const StyledLink = styled(Link)`
  margin: 36px auto;
  text-align: center;
`

export default SmartVault
