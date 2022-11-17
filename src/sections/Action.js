import React from 'react'
import moment from 'moment'
import styled from 'styled-components'
import TableRow from '../components/Table/TableRow'
import TableCell from '../components/Table/TableCell'
import { shortenAddress } from '../utils/web3-utils'
import check from '../assets/success.svg'
import defaultAction from '../assets/default-action.svg'
import useActionMetadata from '../hooks/useActionMetadata'

const Action = ({ primitives }) => {
  const item = primitives[0]
  const metadata = useActionMetadata(item.target)
  console.log('action', metadata)
  return (
    <TableRow key={item.id}>
      <TableCell>
        {item.executedAt
          ? moment.unix(item.executedAt).format('MMM Do, h:mm')
          : '-'}
      </TableCell>
      <TableCell>
          <ActionIcon
            src={metadata.data ? metadata.data.icon : defaultAction}
            alt=""
          />
          {metadata.data ? metadata.data.title : item.type}
      </TableCell>
      <TableCell>{metadata.data ? metadata.data.description : ''}</TableCell>
      <TableCell>{shortenAddress(item.sender)}</TableCell>
      <TableCell>
        <img src={check} alt="" />
      </TableCell>
    </TableRow>
  )
}

const ActionIcon = styled.img`
  height: 23px;
  margin-right: 15px;
`

export default Action
