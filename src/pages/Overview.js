import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import Table from '../components/Table/Table'
import TableRow from '../components/Table/TableRow'
import TableHeader from '../components/Table/TableHeader'
import Hero from '../sections/Hero'
import Action from '../sections/Action'
import SmartVaultDetail from '../sections/SmartVaultDetail'
import AssetsManaged from '../sections/AssetsManaged'
import MoreActions from '../sections/MoreActions'
import { Skeleton } from '../styles/general'
import { Hxl, LinkL, Container } from '../styles/texts'
import split from '../assets/split.svg'
import useSmartVaultParam from '../hooks/useSmartVaultParam'

const Overview = ({ chain, smartVault, smartVaultActions }) => {
  const id = useSmartVaultParam()

  const [width, setWidth] = useState(window.innerWidth)
  useEffect(() => {
    window.addEventListener('resize', () => setWidth(window.innerWidth))
  }, [])
  const medium = 700
  const large = 900
  return (
    <>
      <Container>
        <Hero
          address={id}
          isLoading={smartVault.isLoading}
          lastAction={smartVaultActions?.lastAction}
          totalValueManaged={
            smartVault.isLoading ? undefined : smartVault.data.totalValueManaged
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
      <AssetsManaged address={id || smartVault?.id} chain={chain} />
      <SmartVaultDetail address={id || smartVault?.id} />
      <MoreActions actions={smartVault?.data?.actions} />
    </>
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

export default Overview
