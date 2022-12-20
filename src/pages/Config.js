import React from 'react'
import styled from 'styled-components'
import { useParams } from 'react-router-dom'
import Page from '../components/Page'
import { Container } from '../styles/texts'
import useSmartVaultWithConfig from '../hooks/useSmartVaultWithConfig'
import { Hm } from '../styles/texts'
import Table from '../components/Table/Table'
import TableRow from '../components/Table/TableRow'
import TableHeader from '../components/Table/TableHeader'
import TableCell from '../components/Table/TableCell'

const Config = () => {
  //todo: add loader
  const params = useParams()
  const { data, isLoading } = useSmartVaultWithConfig(params?.id)
  // const [width, setWidth] = useState(window.innerWidth)
  // const medium = 700
  // const large = 900


  let index = 0
  let pfIndex = 0
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
                {/* {width >= large && (
                  <TableHeader title="Description" align="left" />
                )}
                {width >= medium && (
                  <TableHeader title="Excecuted by" align="left" />
                )} */}
                <TableHeader title="" align="center" />
              </TableRow>
            }
          >
            {isLoading ?
              'Loading data...' :
              <>

                <TableData index={index += 1} param='Address' value={data.id} />
                <TableData index={index += 1} param='Total Value Managed' value={data.totalValueManaged} />
                <TableData index={index += 1} param='swapConnector' value={data.swapConnector} />
                <TableData index={index += 1} param='priceOracle' value={data.priceOracle} />
                
                {data.priceFeeds.map(pf => {
                    return <TableData index={index += 1} param={<>priceFeed <Number>{`${pfIndex += 1}`}</Number></>}
                      value={pf.feed} value2={<div> <TextSec>{`base: ${pf.base.id}`}</TextSec>
                        <TextSec>{` quote: ${pf.quote.id}`}</TextSec></div>} />
                  })}
                <Fee index={index += 1} title="swapFee" data={data.swapFee} />
                <Fee index={index += 1} title="withdrawFee" data={data.withdrawFee} />
                <Fee index={index += 1} title="performanceFee" data={data.performanceFee} />
                <TableData index={index += 1} param='feeCollector' value={data.feeCollector} />
                <TableData index={index += 1} param='wrappedNativeToken' value={data.wrappedNativeToken?.name} 
                value2={<div> <TextSec>{`symbol: ${data.wrappedNativeToken?.symbol}`}</TextSec>
                <TextSec>{` token: ${data.wrappedNativeToken?.decimals}`}</TextSec></div>} />
              </>

            }

          </Table>
        </Container>
      </SmartVaultsSection>
    </Page>
  )
}

const Fee = ({index, title, data}) => {
  return (
    <TableData index={index} param={title} value={data?.pct} 
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

// const Text = styled.p`
//   white-space: nowrap;
//   overflow: hidden;
//   text-overflow: ellipsis;
//   max-width: 400px;
// `

const TextSec = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  /* max-width: 400px; */
  color: gray
`


export default Config
