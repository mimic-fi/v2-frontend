import React from 'react'
import styled from 'styled-components'
import { useParams } from 'react-router-dom'
import Page from '../components/Page'
import { Container, Hs } from '../styles/texts'
import useSmartVaultWithConfig from '../hooks/useSmartVaultWithConfig'
import { Hm } from '../styles/texts'
import Table from '../components/Table/Table'
import TableRow from '../components/Table/TableRow'
import TableHeader from '../components/Table/TableHeader'
import TableCell from '../components/Table/TableCell'
import { SMART_VAULT_FUNCTIONS_HASHED } from '../utils/smartVault-utils'
import useActionMetadata from '../hooks/useActionMetadata'
import useSmartVaultMetadata from '../hooks/useSmartVaultMetadata'
import Address from '../components/Address'
import { USDC_DECIMALS } from '../constants/knownTokenDecimals'
import { formatTokenAmount } from '../utils/math-utils'

const Config = () => {
  //todo: add loader
  const params = useParams()
  const { data, isLoading } = useSmartVaultWithConfig(params?.id)
  const { data: metadata } = useSmartVaultMetadata(params?.id)

  let index = 0
  let pfIndex = 0
  let granteesList = []

  // normalize list
  data && data?.permissions.map(p => {
    return p.grantees.forEach((element) => {
      return granteesList.push(element)
    })
  })

  // unique grantees
  const uniqueGrantees = [...new Map(granteesList.map(item => [item['id'], item])).values()]

  const tvmFormated = formatTokenAmount(data?.totalValueManaged, USDC_DECIMALS, {
    digits: 2,
  })


  return (
    <Page sidebar={false}>
      <SmartVaultsSection>
        <Container>
          <Hm>Config</Hm>
          <Table
            header={
              <TableRow>
                <TableHeader title="Param" align="left" />
                <TableHeader title="Value" align="left" />
                <TableHeader title="" align="center" />
              </TableRow>
            }
          >
            {isLoading ?
              'Loading data?...' :
              <>
                <TableData index={index += 1} param='Title' value={metadata?.title} />
                <TableData index={index += 1} param='Description' value={metadata?.description} />


                <TableData index={index += 1} param='Smart Vault Address' value={<Address address={data?.id} />} />
                <TableData index={index += 1} param='Total Value Managed' value={'$ ' + tvmFormated} />
                <TableData index={index += 1} param='swapConnector' value={<Address address={data?.swapConnector} />} />
                <TableData index={index += 1} param='priceOracle' value={<Address address={data?.priceOracle} />} />

                {data && data?.priceFeeds.map(pf => {
                  return <TableData key={pf.feed} index={index += 1} 
                  param={<>priceFeed <Number>{`${pfIndex += 1}`}</Number></>}
                    value={<Address address={pf.feed} />} value2={<div> <TextSec>{`base: ${pf.base.id}`}</TextSec>
                      <TextSec>{` quote: ${pf.quote.id}`}</TextSec></div>} />
                })}
                <Fee index={index += 1} title="swapFee" data={data?.swapFee} />
                <Fee index={index += 1} title="withdrawFee" data={data?.withdrawFee} />
                <Fee index={index += 1} title="performanceFee" data={data?.performanceFee} />
                <TableData index={index += 1} param='feeCollector' value={<Address address={data?.feeCollector} />} />
                <TableData index={index += 1} param='wrappedNativeToken' value={data?.wrappedNativeToken?.name}
                  value2={<div> <TextSec>{`symbol: ${data?.wrappedNativeToken?.symbol}`}</TextSec>
                    <TextSec>{` token: ${data?.wrappedNativeToken?.decimals}`}</TextSec></div>} />
              </>
            }

          </Table>
          <br />
          <br />
          <Hs>Permissions</Hs>
          <br />
          <Table
            header={
              <TableRow>
                <TableHeader title="Grantees" align="left" />
                <TableHeader title="Methods" align="left" />
                <TableHeader title="" align="center" />
              </TableRow>
            }>
            {uniqueGrantees.map(g => {
              return <RenderGrantee key={g?.id} grantee={g} index={index += 1} />
            })}
          </Table>
        </Container>
      </SmartVaultsSection>
    </Page>
  )
}
const formatPct = (pct) => pct ? formatTokenAmount(pct, 18, { digits: 3 }) + '%' : '0%'

const RenderGrantee = ({ grantee, index }) => {
  const { data, isLoading } = useActionMetadata(grantee?.id)
  return (
    <TableData key={index} index={index} param={data ?

      <ShowAction action={data} isLoading={isLoading} id={grantee?.id} /> : <Address address={grantee?.id} />}
      value={<Grantees grantees={grantee} />} />
  )
}

const getMethodName = (method) => {
  const meth = method.slice(2)
  return SMART_VAULT_FUNCTIONS_HASHED[meth]
}

const Grantees = ({ grantees }) => {
  return <div>
    {grantees.permissions.map((p, i ) => {
      return <Text key={`${grantees?.id}-${p.method}`}> {getMethodName(p.method)}</Text>
    })}
  </div>
}

const ShowAction = ({ action, id, isLoading }) => {
  return isLoading ? 'Loading data?...' : <div>
    <Address address={id} />
    <Text>{action.title}</Text>
    <Text>{action.description}</Text>
  </div>
}

const Fee = ({ index, title, data }) => {
  return (
    <TableData index={index} param={title} value={formatPct(data?.pct)}
      value2={<div> <TextSec>{`cap: ${data?.cap}, period: ${data?.period}`}</TextSec>
        <TextSec>{` token: ${data?.token?.name}`}</TextSec></div>} />
  )
}

const TableData = ({ index, param, value, value2 = '' }) => {
  return (
    <Row key={index} >
      <TableCell>
        <Number> {index} </Number>
        {param}
      </TableCell>

      <TableCell>
        {value}
      </TableCell>

      <TableCell>
        {value2}
      </TableCell>

    </Row>
  )
}

const SmartVaultsSection = styled.section`
  height: auto;
  min-height: 1700px;
  padding-top: 80px;
  color: white;
  @media only screen and (max-width: 700px) {
    min-height: 650px;
    padding: 60px 0 0 0;
  }

`

const Row = styled(TableRow)`
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

const TextSec = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  /* max-width: 400px; */
  color: gray
`

export default Config
