import React, { useEffect, useState } from 'react'
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
  const [width, setWidth] = useState(window.innerWidth)
  useEffect(() => {
    window.addEventListener('resize', () => setWidth(window.innerWidth))
  }, [])
  const medium = 700
  const large = 900

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
      {width >= large && (
        <TableCell>{metadata.data ? metadata.data.description : ''}</TableCell>
      )}
      {width >= medium && <TableCell>{shortenAddress(item.sender)}</TableCell>}
      <TableCell>
        <img src={check} alt="" />
      </TableCell>
    </TableRow>
  )
}

const ActionIcon = styled.img`
  height: 23px;
  margin-right: 15px;
  @media only screen and (max-width: 700px) {
    height: 17px;
    margin-right: 5px;
  }
`

export default Action
