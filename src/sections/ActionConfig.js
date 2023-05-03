import React from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { Hs, BodyL } from '../styles/texts'
import Table from '../components/Table/Table'
import TableRow from '../components/Table/TableRow'
import TableCell from '../components/Table/TableCell'
import Address from '../components/Address'
import Grantees from '../components/Grantees'
import useActionMetadata from '../hooks/useActionMetadata'
import useActionPermissions from '../hooks/useActionPermissions'

const ActionConfig = () => {
  const actionId = useParams().action
  const metadata = useActionMetadata(actionId)
  const permissions = useActionPermissions(actionId)
  const permissionsArray = permissions?.data?.permissions
    ? Object.values(permissions.data.permissions)
    : undefined

  return (
    <>
      <Hs>{metadata?.data?.title} action</Hs>
      <BodyL>{metadata?.data?.description}</BodyL>
      <br />
      <br />
      <Table>
        <TableRow>
          <Name>Status</Name>
          <TableCell style={{ textTransform: 'capitalize', color: '#5DFBD7' }}>
            active
          </TableCell>
        </TableRow>
        <TableRow>
          <Name>Action address</Name>
          <TableCell>
            <Address address={actionId} />
          </TableCell>
        </TableRow>
        <TableRow>
          <Name>Action type</Name>
          <TableCell style={{ fontWeight: '700' }}>
            {metadata?.data?.trigger || 'Automatic'}
          </TableCell>
        </TableRow>
      </Table>
      <br />
      <br />
      <br />
      <br />
      <Hs>{metadata?.data?.title} permissions</Hs>
      <br />
      <Table>
        {permissionsArray && permissionsArray.map((permission, index) => {
          return (
            <React.Fragment key={index}>
              {permission.grantees.map((grantee, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Address address={grantee.id} />
                  </TableCell>
                  <TableCell><Grantees grantees={grantee}/></TableCell>
                </TableRow>
              ))}
            </React.Fragment>
          )
        })}
      </Table>
    </>
  )
}

const Name = styled(TableCell)`
  color: #a5a1b7;
`

export default ActionConfig
