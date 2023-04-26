import React from 'react'
import styled from 'styled-components'
import Page from '../components/Page'
import { Container, Hxl } from '../styles/texts'
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

  const totalRelayedCostUsdSum = data.reduce(function (prev, current) {
    return prev + +current.data.totalRelayedCostUsd
  }, 0)

  const totalGasRefundsUsdSum = data.reduce(function (prev, current) {
    return prev + +current.data.totalGasRefundsUsd
  }, 0)

  const totalFeesUsdSum = data.reduce(function (prev, current) {
    return prev + +current.data.totalFeesUsd
  }, 0)

  const totalValueManagedSum = data.reduce(function (prev, current) {
    return prev + +current.data.totalValueManaged
  }, 0)

  return (
    <Page sidebar={false}>
        <StyledContainer>
          <Hxl>Stats</Hxl>
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

            <TableData
              chain={'TOTAL'}
              totalRelayedCostUsd={format(totalRelayedCostUsdSum)}
              totalGasRefundsUsd={format(totalGasRefundsUsdSum)}
              totalFeesUsd={format(totalFeesUsdSum)}
              totalValueManaged={format(totalValueManagedSum)}
            />
          </Table>

        </StyledContainer>
    </Page>
  )
}

const TableData = ({ chain, totalRelayedCostUsd, totalGasRefundsUsd, totalFeesUsd, totalValueManaged }) => {
  return (
    <TableRow key={chain}>
      <TableCell>
        <Number> {chain} </Number>
        {CHAIN_INFO[chain]?.name}
      </TableCell>
      <TableCell>$ {totalRelayedCostUsd}</TableCell>
      <TableCell>$ {totalGasRefundsUsd}</TableCell>
      <TableCell>$ {totalFeesUsd}</TableCell>
      <TableCell>$ {totalValueManaged}</TableCell>
    </TableRow>
  )
}

const StyledContainer = styled(Container)`
  overflow-x: scroll;
`
const Number = styled.div`
  padding: 0 20px;
  color: ${props => props.theme.mainDefault};
`

export default Stats
