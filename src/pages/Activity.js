import React from 'react'
import styled from 'styled-components'
import { Container } from '../styles/texts'
import Table from '../components/Table/Table'
import TableRow from '../components/Table/TableRow'
import TableHeader from '../components/Table/TableHeader'
import ActivityItem from '../sections/ActivityItem'
import { Hm } from '../styles/texts'
import { Skeleton } from '../styles/general'
import useActivityPrimitives from '../hooks/useActivityPrimitives'
import useSmartVaultParam from '../hooks/useSmartVaultParam'

const Activity = ({ width }) => {
  const id = useSmartVaultParam()
  const { actions } = useActivityPrimitives(id, 1000, 1)
  const medium = 700
  const large = 1000
  const xlarge = 1200

  console.log(width)
  return (
    <ActivitySection>
      <Container>
        <Hm>Activity</Hm>
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
                {width >= large && <TableHeader title="Details" align="left" />}
                {width >= xlarge && (
                  <>
                    <TableHeader title="Excecuted by" align="left" />
                  </>
                )}

                {width >= medium && <TableHeader title="Date" align="center" />}
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
                  width={width}
                />
              )
            })}
          </Table>
        )}
      </Container>
    </ActivitySection>
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
