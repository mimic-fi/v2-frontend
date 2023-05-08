import React from 'react'
import styled from 'styled-components'
import { Hs, BodyL } from '../styles/texts'
import { Skeleton } from '../styles/general'
import Address from '../components/Address'
import Table from '../components/Table/Table'
import TableRow from '../components/Table/TableRow'
import TableHeader from '../components/Table/TableHeader'
import TableCell from '../components/Table/TableCell'
import Grantees from '../components/Grantees'
import useActionMetadata from '../hooks/useActionMetadata'
import useSmartVaultMetadata from '../hooks/useSmartVaultMetadata'
import useSmartVaultParam from '../hooks/useSmartVaultParam'
import useSmartVaultWithConfig from '../hooks/useSmartVaultWithConfig'
import { formatTokenAmount } from '../utils/math-utils'
import { USDC_DECIMALS } from '../constants/knownTokenDecimals'
import { normalizePermissions } from '../utils/smartVault-utils'

const GeneralConfig = () => {
  let index = 0
  const id = useSmartVaultParam()
  const { data, isLoading } = useSmartVaultWithConfig(id)
  const { data: metadata } = useSmartVaultMetadata(id)

  const uniqueGrantees = normalizePermissions(data)

  const tvmFormated = formatTokenAmount(
    data?.totalValueManaged,
    USDC_DECIMALS,
    {
      digits: 2,
    }
  )

  return (
    <>
      {isLoading ? (
        <>
          <br />
          <br />
          <Skeleton height="890px" width="100%" marginBottom="30px" />
        </>
      ) : (
        <>
          <Hs>{metadata?.title}</Hs>
          <BodyL>{metadata?.description}</BodyL>
          <br />
          <br />
          <br />
          <Hs>Smart Vault params</Hs>
          <Table
            header={
              <TableRow>
                <TableHeader title="Param" align="left" />
                <TableHeader title="Description" align="left" />
              </TableRow>
            }
          >
            <TableData
              index={(index += 1)}
              param="Smart Vault Address"
              value={<Address address={data?.id} />}
            />
            <TableData
              index={(index += 1)}
              param="Total Value Managed"
              value={'$ ' + tvmFormated}
            />
            <TableData
              index={(index += 1)}
              param="swapConnector"
              value={<Address address={data?.swapConnector} />}
            />
            <TableData
              index={(index += 1)}
              param="priceOracle"
              value={<Address address={data?.priceOracle} />}
            />

            <Fee index={(index += 1)} title="swapFee" data={data?.swapFee} />
            <Fee
              index={(index += 1)}
              title="withdrawFee"
              data={data?.withdrawFee}
            />
            <Fee
              index={(index += 1)}
              title="performanceFee"
              data={data?.performanceFee}
            />
            <TableData
              index={(index += 1)}
              param="feeCollector"
              value={<Address address={data?.feeCollector} />}
            />
            <TableData
              index={(index += 1)}
              param="wrappedNativeToken"
              value={data?.wrappedNativeToken?.name}
              value2={
                <div>
                  {' '}
                  <TextSec>{`symbol: ${
                    data?.wrappedNativeToken?.symbol
                  }`}</TextSec>
                  <TextSec>{` token: ${
                    data?.wrappedNativeToken?.decimals
                  }`}</TextSec>
                </div>
              }
            />
          </Table>
          <br />
          <br />
          <br />
          <br />
          <Hs>Smart Vault permissions</Hs>
          <Table
            header={
              <TableRow>
                <TableHeader title="Grantees" align="left" />
                <TableHeader title="Methods" align="left" />
                <TableHeader title="" align="center" />
              </TableRow>
            }
          >
            {uniqueGrantees.map(g => {
              let i = (index += 1)
              return (
                <RenderGrantee key={`${g?.id}/${i}`} grantee={g} index={i} />
              )
            })}
          </Table>
        </>
      )}
    </>
  )
}
const formatPct = pct =>
  pct ? formatTokenAmount(pct, 18, { digits: 3 }) + '%' : '0%'

const RenderGrantee = ({ grantee, index }) => {
  const { data, isLoading } = useActionMetadata(grantee?.id)
  return (
    <TableData
      key={index}
      index={index}
      param={
        data ? (
          <ShowAction action={data} isLoading={isLoading} id={grantee?.id} />
        ) : (
          <Address address={grantee?.id} />
        )
      }
      value={<Grantees grantees={grantee} />}
    />
  )
}

const ShowAction = ({ action, id, isLoading }) => {
  return isLoading ? (
    'Loading data?...'
  ) : (
    <BreakAll>
      <Address address={id} />
      <ActionDetail>
        <Text>{action.title}</Text>
        <TextSec>{action.description}</TextSec>
      </ActionDetail>
    </BreakAll>
  )
}

const Fee = ({ index, title, data }) => {
  return (
    <TableData
      index={index}
      param={title}
      value={formatPct(data?.pct)}
      value2={
        <div>
          <TextSec>
            {data?.cap !== undefined && 'cap: ' + data?.cap}{' '}
            {data?.period !== undefined && 'period: ' + data?.period}
          </TextSec>
          <TextSec>
            {data?.token?.name !== undefined && 'token: ' + data?.token?.name}
          </TextSec>
        </div>
      }
    />
  )
}

const TableData = ({ index, param, value, value2 = '' }) => {
  return (
    <Row key={index}>
      <TableCell style={{ fontWeight: '700' }}>
        <BreakAll>{param}</BreakAll>
      </TableCell>
      <TableCell>
        <div>
          {value}
          <br />
          {value2}
        </div>
      </TableCell>
    </Row>
  )
}

const BreakAll = styled.div`
  word-break: break-all;
  white-space: pre-line;
`

const Row = styled(TableRow)``

const Text = styled.p`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 400px;
`

const TextSec = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  color: #a5a1b7;
  line-height: 22px;
`

const ActionDetail = styled.div`
  font-weight: 400;
  margin-top: 15px;
  p {
    margin-bottom: 5px;
  }
`

export default GeneralConfig
