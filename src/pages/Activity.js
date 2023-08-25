import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Container } from '../styles/texts'
import Page from '../components/Page'
import Table from '../components/Table/Table'
import TableRow from '../components/Table/TableRow'
import TableHeader from '../components/Table/TableHeader'
import ActivityItem from '../sections/ActivityItem'
import { Hxl } from '../styles/texts'
import { Skeleton } from '../styles/general'
import useActivityPrimitives from '../hooks/useActivityPrimitives'
import useSmartVaultParam from '../hooks/useSmartVaultParam'

const Activity = () => {
  const id = useSmartVaultParam()
  const { actions } = useActivityPrimitives(id, 1000, 1)
  const [width, setWidth] = useState(window.innerWidth)
  useEffect(() => {
    window.addEventListener('resize', () => setWidth(window.innerWidth))
  }, [])
  const medium = 700
  const large = 900

  return (
    <Page>
      <ActivitySection>
        <Container>
          <Hxl>Activity</Hxl>
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
                  <TableHeader title="NET" align="left" />
                  <TableHeader title="Action" align="left" />
                  <TableHeader title="Status" align="left" />
                  {width >= large && (
                    <TableHeader title="Details" align="left" />
                  )}

                  {width >= medium && (
                    <TableHeader title="Excecuted by" align="left" />
                  )}
                  <TableHeader title="Date" align="center" />
                </TableRow>
              }
            >
              {actions?.map((action, i) => {
                return (
                  <ActivityItem
                    key={i}
                    primitives={action?.data ? action.data : null}
                    chain={action?.chain}
                    index={i + 1}
                  />
                )
              })}
            </Table>
          )}
        </Container>
      </ActivitySection>
    </Page>
  )
}

const ActivitySection = styled.section`
  height: auto;
  padding: 80px 0;
  color: white;
  width: 100%;
  margin: auto;
`

export default Activity
