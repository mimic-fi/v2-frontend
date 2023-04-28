import React from 'react'
import styled from 'styled-components'
import { Hxl, Container } from '../styles/texts'
import Table from '../components/Table/Table'
import TableRow from '../components/Table/TableRow'
import TableCell from '../components/Table/TableCell'
import TableHeader from '../components/Table/TableHeader'
import defaultAction from '../assets/default-action.svg'
import useActionMetadata from '../hooks/useActionMetadata'

const MoreActions = ({ actions }) => {
  //TODO: remove two hardcoded items and replace them for real data

  return (
    <MoreActionsSection>
      <Container>
        <Hxl>Actions</Hxl>
        <Content actions={actions} />
      </Container>
    </MoreActionsSection>
  )
}

const Content = ({ actions }) => {
  return (
    <Table
      header={
        <TableRow>
          <TableHeader title="#" align="left" />
          <TableHeader title="Action" align="left" />
          <TableHeader title="Description" align="left" />
          <TableHeader title="Type" align="left" />
          <TableHeader title="Status" align="left" />
        </TableRow>
      }
    >
      {actions?.map((action, i) => {
        return <Action key={i} action={action} index={i + 1} />
      })}
      {actions?.length === 0 && 'No actions'}
    </Table>
  )
}

const Action = ({ action, index }) => {
  const metadata = useActionMetadata(action.id)
  console.log('action delfi', metadata)
  return (
    <TableRow>
      <TableCell align="left">{index}</TableCell>
      <TableCell align="left">
        <ActionIcon
          src={metadata.data ? metadata.data?.icon : defaultAction}
          alt=""
        />
        {metadata?.data?.title}
      </TableCell>
      <TableCell align="left">{metadata?.data?.description}</TableCell>
      <TableCell align="left"><div className="grey"> {metadata?.data?.trigger || 'Automatic' }</div></TableCell>
      <TableCell align="left">
        <div className="success">Active</div>
      </TableCell>
    </TableRow>
  )
}

const MoreActionsSection = styled.section`
  height: auto;
  max-width: 1140px;
  margin: auto;
  padding: 80px 0 30px 0;
  width: 100%;
  box-sizing: border-box;
  @media only screen and (max-width: 700px) {
    padding: 70px 0;
    overflow-x: scroll;
  }
  .grey {
    color: #A5A1B7;
  }
  color: white;
  text-align: left;
  h2,
  p {
    margin-left: 0;
    max-width: 620px;
  }
  img {
    height: 30px;
    padding-right: 7px;
  }
  table {
    white-space: nowrap;
    overflow-x: scroll;
  }
`

const ActionIcon = styled.img`
  height: 23px;
  width: 23px;
  margin-right: 15px;
  @media only screen and (max-width: 700px) {
    height: 17px;
    margin-right: 5px;
  }
`

export default MoreActions
