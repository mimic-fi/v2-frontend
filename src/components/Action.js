import React from 'react'
import moment from 'moment'
import TableRow from '../components/Table/TableRow'
import TableCell from '../components/Table/TableCell'
import check from '../assets/success.svg'
import useActionMetadata from '../hooks/useActionMetadata'

const Action = ({ primitives }) => {
  const item = primitives[0]
  const metadata = useActionMetadata(item.target)
  console.log('metadata', metadata)
  return (
    <TableRow key={item.id}>
      <TableCell>
        {item.executedAt
          ? moment.unix(item.executedAt).format('MMM Do, h:mm')
          : '-'}
      </TableCell>
      <TableCell>{item.type}</TableCell>
      <TableCell>{item.sender}</TableCell>
      <TableCell>
        <img src={check} alt=""/>
      </TableCell>
    </TableRow>
  )
}

export default Action
