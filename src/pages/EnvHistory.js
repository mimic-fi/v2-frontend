import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useParams } from 'react-router-dom'
import { Container } from '../styles/texts'
// import Subnavbar from '../components/Subnavbar'
import Page from '../components/Page'
import Table from '../components/Table/Table'
import TableRow from '../components/Table/TableRow'
import TableHeader from '../components/Table/TableHeader'
import Action from '../sections/Action'
import { Hxxs } from '../styles/texts'
import { Skeleton } from '../styles/general'
// import useSmartVaultParam from '../hooks/useSmartVaultParam'
import usePrimitivesFromSmartVault from '../hooks/usePrimitivesFromSmartVault'

const EnvHistory = () => {
  const params = useParams()
  // const env = '0x94dd9c6152a2a0bbcb52d3297b723a6f01d5f9f7'

  const id = params?.id
  const {actions} = usePrimitivesFromSmartVault(id, 1000, 1)
  const [width, setWidth] = useState(window.innerWidth)
  useEffect(() => {
    window.addEventListener('resize', () => setWidth(window.innerWidth))
  }, [])
  const medium = 700
  const large = 900

console.log('smartVault actions', params )
  return (
    <Page>
      {/* <Subnavbar active="history" address={env} /> */}
      <LatestActionsSection>
        <Container>
          <Hxxs>
          env:{id}
          </Hxxs>
          {false ? (
            <>
              <br />
              <br />
              <Skeleton height="180px" width="100%" marginBottom="30px" />
            </>
          ) : (
            <Table
              header={
                <TableRow>
                  <TableHeader title="#" align="left" />
                  <TableHeader title="Date" align="left" />
                  <TableHeader title="Action" align="left" />
                  {width >= large && (
                    <TableHeader title="Amounts" align="left" />
                  )}
                  {/* {width >= large && (
                    <TableHeader title="Description" align="left" />
                  )} */}
                 
                  {width >= medium && (
                    <TableHeader title="Excecuted by" align="left" />
                  )}
                  <TableHeader title="Status" align="center" />
                </TableRow>
              }
            >
              {actions?.map((action, i) => {
                return (
                  <Action
                    key={action.id}
                    primitives={action.data}
                    chain={action.chain}
                    index={i + 1}
                  />
                )
              })}
              {/* {smartVault?.actions?.length === 0 && 'No actions'} */}
            </Table>
          )}
        </Container>
      </LatestActionsSection>
    </Page>
  )
}

const LatestActionsSection = styled.section`
  height: auto;
  padding: 80px 0;
  color: white;
  width: 100%;
  margin: auto;
`

export default EnvHistory
