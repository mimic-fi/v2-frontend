import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import Page from '../components/Page'
import { Container, Hm } from '../styles/texts'
import useChainsStats from '../hooks/useChainsStats'
import Table from '../components/Table/Table'
import TableRow from '../components/Table/TableRow'
import TableHeader from '../components/Table/TableHeader'
import TableCell from '../components/Table/TableCell'
import { formatTokenAmount } from '../utils/math-utils'
import { USDC_DECIMALS } from '../constants/knownTokenDecimals'
import { CHAIN_INFO } from '../constants/chainInfo'

const Stats = () => {
  const data = useChainsStats()
  const format = (value) => formatTokenAmount(value, USDC_DECIMALS, {
    digits: 2,
  })

  return (
    <Page sidebar={false}>
      <SmartVaultsSection>
        <Container>
          <Hm>Stats</Hm>
          <Table
            header={
              <TableRow>
                <TableHeader title="chain" align="left" />
                <TableHeader title="totalRelayedCostUsd" align="left" />
                <TableHeader title="totalGasRefundsUsd" align="left" />
                <TableHeader title="totalFeesUsd" align="left" />
                <TableHeader title="totalValueManaged" />
              </TableRow>
            }
          >
            {
              data?.length > 0 ? data.map(c => {
                return (
                  <TableData
                    chain={c.value}
                    totalRelayedCostUsd={format(c.data.totalRelayedCostUsd)}
                    totalGasRefundsUsd={format(c.data.totalGasRefundsUsd)}
                    totalFeesUsd={format(c.data.totalFeesUsd)}
                    totalValueManaged={format(c.data.totalValueManaged)}
                  />
                )
              }) : 'no data'
            }
          </Table>

        </Container>
      </SmartVaultsSection>
    </Page>
  )
}

const TableData = ({ chain, totalRelayedCostUsd, totalGasRefundsUsd, totalFeesUsd, totalValueManaged }) => {
  return (
    <Row key={chain}>
      <TableCell>
        <Number> {chain} </Number>
        {CHAIN_INFO[chain].name}
      </TableCell>
      <TableCell>$ {totalRelayedCostUsd}</TableCell>
      <TableCell>$ {totalGasRefundsUsd}</TableCell>
      <TableCell>$ {totalFeesUsd}</TableCell>
      <TableCell>$ {totalValueManaged}</TableCell>
    </Row>
  )
}

const Row = styled(TableRow)``


const SmartVaultsSection = styled.section`
  height: auto;
  min-height: 1700px;
  padding-top: 80px;
  color: white;
  @media only screen and (max-width: 700px) {
    min-height: 650px;
    padding: 60px 0 0 0;
  }
  h2 {
    color: violet;
  }
`

const Number = styled.div`
  padding: 0 20px;
  color: ${props => props.theme.mainDefault};
`

export default Stats
