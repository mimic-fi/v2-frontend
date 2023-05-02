import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import Page from '../components/Page'
import Subnavbar from '../components/Subnavbar'
import { Container, BodyL } from '../styles/texts'
import useSmartVaultWithConfig from '../hooks/useSmartVaultWithConfig'
import { Hm, Hs, BodyS } from '../styles/texts'
import { Skeleton } from '../styles/general'
import Table from '../components/Table/Table'
import TableRow from '../components/Table/TableRow'
import TableHeader from '../components/Table/TableHeader'
import TableCell from '../components/Table/TableCell'
import Split from '../components/Split'
import { SMART_VAULT_FUNCTIONS_HASHED } from '../utils/smartVault-utils'
import useActionMetadata from '../hooks/useActionMetadata'
import useSmartVaultMetadata from '../hooks/useSmartVaultMetadata'
import useSmartVaultParam from '../hooks/useSmartVaultParam'
import Address from '../components/Address'
import { USDC_DECIMALS } from '../constants/knownTokenDecimals'
import { formatTokenAmount } from '../utils/math-utils'
import sv from '../assets/configMenu/sv.svg'

const Config = () => {
  const [active, setActive] = useState(0)
  const handleClick = e => {
    const index = parseInt(e.target.id, 0)
    if (index !== active) {
      setActive(index)
    }
  }
  const id = useSmartVaultParam()
  const { data, isLoading } = useSmartVaultWithConfig(id)
  const { data: metadata } = useSmartVaultMetadata(id)

  let index = 0
  // let pfIndex = 0
  let granteesList = []

  // normalize list
  data &&
    data?.permissions.map(p => {
      return p.grantees.forEach(element => {
        return granteesList.push(element)
      })
    })

  // unique grantees
  const uniqueGrantees = [
    ...new Map(granteesList.map(item => [item['id'], item])).values(),
  ]

  const tvmFormated = formatTokenAmount(
    data?.totalValueManaged,
    USDC_DECIMALS,
    {
      digits: 2,
    }
  )

  return (
    <Page sidebar={false}>
      <Subnavbar active="configuration" address={id} />
      <ConfigSection>
        <Container>
          <Split
            primary={
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

                      <Fee
                        index={(index += 1)}
                        title="swapFee"
                        data={data?.swapFee}
                      />
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
                          <RenderGrantee
                            key={`${g?.id}/${i}`}
                            grantee={g}
                            index={i}
                          />
                        )
                      })}
                    </Table>
                  </>
                )}
              </>
            }
            secondary={
              <Tabs>
                <Title>SMART VAULT</Title>
                <Tab onClick={handleClick} active={active === 0} id={0}>
                  <img src={sv} />
                  General
                </Tab>
              </Tabs>
            }
          />
        </Container>
      </ConfigSection>
    </Page>
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

const getMethodName = method => {
  const meth = method.slice(2)
  return SMART_VAULT_FUNCTIONS_HASHED[meth]
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
          {' '}
          <TextSec>{`cap: ${data?.cap}, period: ${data?.period}`}</TextSec>
          <TextSec>{` token: ${data?.token?.name}`}</TextSec>
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


const Grantees = ({ grantees }) => {
  const [showAll, setShowAll] = useState(false)
  const [text, setText] = useState('')

  useEffect(() => {
    const textArray = grantees.permissions.map((p, i) => getMethodName(p.method))
    setText(textArray.join('\n'))
  }, [grantees])

  const toggleShowAll = () => setShowAll(!showAll)
  const toggleText = showAll ? 'Hide details' : 'Show details'
  const textLines = text.split('\n')
  const visibleText = showAll ? text : textLines.slice(0, 4).join('\n')

  return (
    <div>
      <TextSec>{visibleText}</TextSec>
      {textLines.length > 4 && (
        <SeeMore onClick={toggleShowAll}>{toggleText}</SeeMore>
      )}
    </div>
  )
}

const SeeMore = styled(BodyS)`
  font-weight: 700;
  cursor: pointer;
  color: #5DFBD7;
`

const BreakAll = styled.div`
  word-break: break-all;
  white-space: pre-line;
`

const Title = styled.div`
  font-family: 'GTWalsheimPro';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 32px;
  color: #a5a1b7;
`

const Tabs = styled.div``

const Tab = styled(BodyL)`
  border: none;
  outline: none;
  cursor: pointer;
  padding: 10px 15px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  background-color: ${props => (props.active ? '#5542A9' : 'transparent')};
  color: ${props => (props.active ? '#FCFCFD' : ' #a5a1b7')};
  transition: all 0.1s ease-in-out;
  img {
    padding-right: 7px;
  }

  :hover {
    background-color: #5542a9;
    color: #fcfcfd;
  }
`

const Content = styled.div`
  ${props => (props.active ? '' : 'display:none')};
  p {
    margin-top: 0;
  }
`

const ConfigSection = styled.section`
  height: auto;
  min-height: 1700px;
  padding-top: 80px;
  color: white;
  td {
    max-width: 446px;
  }
  @media only screen and (max-width: 700px) {
    min-height: 650px;
    padding: 60px 0 0 0;
  }
`

const Row = styled(TableRow)``

const Number = styled.div`
  color: ${props => props.theme.mainDefault};
`

const Text = styled.p`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 400px;
`

const TextSec = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  color: #A5A1B7;
  line-height: 22px;
`

const ActionDetail = styled.div`
  font-weight: 400;
  margin-top: 15px;
  p {
    margin-bottom: 5px;
  }
`

export default Config
