import React, { useEffect, useState } from 'react'
import moment from 'moment'
import styled from 'styled-components'
import TableRow from '../components/Table/TableRow'
import TableCell from '../components/Table/TableCell'
import ActionDetail from './ActionDetail'
import check from '../assets/success.svg'
import defaultAction from '../assets/default-action.svg'
import useActionMetadata from '../hooks/useActionMetadata'
import AddressName from '../components/AddressName'

const Action = ({ primitives, index }) => {
  const item = primitives[0]
  const metadata = useActionMetadata(item?.transaction?.target)
  const [width, setWidth] = useState(window.innerWidth)
  useEffect(() => {
    window.addEventListener('resize', () => setWidth(window.innerWidth))
  }, [])
  const medium = 700
  const large = 900
  const [isOpen, setOpen] = useState(false)

  return (
    <>
    <Row key={item.id} onClick={() => setOpen(!isOpen)}>
      <TableCell>
      <Number> {index} </Number>
        {item?.transaction?.executedAt
          ? moment.unix(item?.transaction?.executedAt).format('MMM Do')
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
        <TableCell>
          <Text>{metadata.data ? metadata.data.description : ''}</Text>
        </TableCell>
      )}
      {width >= medium && <TableCell><AddressName address={item?.transaction?.sender}/></TableCell>}
      <TableCell>
        <img src={check} alt="check" />
      </TableCell>

    </Row>
    <ActionDetail
      title={metadata.data ? metadata.data.successMessage : item.type}
      primitives={primitives}
      open={isOpen}
      onClose={() => setOpen(!isOpen)}
    />
    </>
  )
}
const Row = styled(TableRow)`
  cursor: pointer;
`

const Number = styled.div`
  padding: 0 20px;
  color: ${props => props.theme.mainDefault};
`

const Text = styled.p`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 400px;
`
const ActionIcon = styled.img`
  height: 23px;
  margin-right: 15px;
  @media only screen and (max-width: 700px) {
    height: 17px;
    margin-right: 5px;
  }
`

export default Action
