import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { Hs, BodyL } from '../styles/texts'
import Table from '../components/Table/Table'
import TableRow from '../components/Table/TableRow'
import TableCell from '../components/Table/TableCell'
import Address from '../components/Address'
import Grantees from '../components/Grantees'
import ContractParams from './ContractParams'
import useActionMetadata from '../hooks/useActionMetadata'
import useActionPermissions from '../hooks/useActionPermissions'
import { normalizePermissions } from '../utils/smartVault-utils'

const ActionConfig = () => {
  const navigate = useNavigate()
  const params = useParams()
  const actionId = params.action
  const metadata = useActionMetadata(actionId)
  const { data, isLoading } = useActionPermissions(actionId)

  const uniqueGrantees = normalizePermissions(data)
  console.log('unique', uniqueGrantees)

  if (metadata.data === false && !data && uniqueGrantees.length === 0) {
    navigate('/smart-vaults/' + params.id + '/config')
  }
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
      <ContractParams
        id={actionId}
        name={metadata?.data?.title ? metadata.data.title : 'Action'}
      />
      <br />
      <br />
      <br />
      <br />
      {uniqueGrantees && uniqueGrantees.length > 0 && <Hs>{metadata?.data?.title} permissions</Hs>}
      <br />
      {isLoading ? (
        'Loading permissions...' // TODO: fix this loader
      ) : (
        <Table>
          {uniqueGrantees &&
            uniqueGrantees.map((grantee, index) => {
              return (
                <TableRow key={index}>
                  <TableCell>
                    <Address address={grantee.id} />
                  </TableCell>
                  <TableCell>
                    <Grantees grantees={grantee} />
                  </TableCell>
                </TableRow>
              )
            })}
        </Table>
      )}
    </>
  )
}

const Name = styled(TableCell)`
  color: #a5a1b7;
`

export default ActionConfig
