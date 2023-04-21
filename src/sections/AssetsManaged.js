import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Hxl, Container, BodyM, BodyXl } from '../styles/texts'
import Table from '../components/Table/Table'
import TableRow from '../components/Table/TableRow'
import TableCell from '../components/Table/TableCell'
import TableHeader from '../components/Table/TableHeader'
import TokenDetail from './TokenDetail'
import { Skeleton } from '../styles/general'
import tokenSample from '../assets/token-sample.svg'
import { useTokensBalance } from '../hooks/useTokenBalance'
import { CHAIN_INFO } from '../constants/chainInfo'

const AssetsManaged = ({ address, chain }) => {
  return (
    <AssetsManagedSection>
      <Container>
        <TitleBox>
          <Hxl>
            Assets being
            <br />
            managed
          </Hxl>
          <a
            href={CHAIN_INFO[chain].explorer + 'tokenholdings?a=' + address}
            target="_blank"
            rel="noreferrer"
          >
            <Button>Manage</Button>
          </a>
        </TitleBox>
        <Content address={address} chain={chain} />
      </Container>
    </AssetsManagedSection>
  )
}

const Content = ({ address, chain }) => {
  const [loading, setLoading] = useState(true)
  const results = useTokensBalance(address, chain)

  useEffect(
    () => {
      if (Object.keys(results).length > 0) {
        setLoading(false)
      }
    },
    [results]
  )

  if (loading) {
    return (
      <>
        <br />
        <br />
        <Skeleton height="300px" width="100%" marginBottom="30px" />
      </>
    )
  }
  return (
    <Table
      header={
        <TableRow>
          <TableHeader title="Token" align="left" />
          <TableHeader title="Price" align="left" />
          <TableHeader title="24h change" align="left" />
          <TableHeader title="Balance" align="left" />
          <TableHeader title="Value" align="left" />
          <TableHeader title="" align="center" />
        </TableRow>
      }
    >
      {Object.values(results)
        ? Object.values(results).map((token, i) => {
            return (
              <TableRow key={i}>
                <TableCell align="left">
                  <TokenName>
                    <img
                      src={token.logoURI}
                      alt="Logo"
                      onError={e => {
                        e.target.onerror = null
                        e.target.src = tokenSample
                      }}
                    />
                    {token.name}, <span>{token.symbol}</span>
                  </TokenName>
                </TableCell>
                <TokenDetail
                  balance={token.balance}
                  tokenAddress={token.address}
                />
                <TableCell align="center">
                  <a
                    href={
                      CHAIN_INFO[chain].explorer +
                      'token/' +
                      token.address +
                      '?a=' +
                      address
                    }
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Button>View</Button>
                  </a>
                </TableCell>
              </TableRow>
            )
          })
        : 'loading!'}
    </Table>
  )
}

const Button = styled(BodyM)`
  border: solid 2px #353945;
  font-weight: 700;
  font-weight: 700;
  margin: 0;
  padding: 0px 15px;
  border-radius: 20px;
  cursor: pointer;

  &:hover {
    background: #353945;
  }
`

const AssetsManagedSection = styled.section`
  height: auto;
  max-width: 1140px;
  margin: auto;
  padding: 80px 0 30px 0;
  width: 100%;
  box-sizing: border-box;
  @media only screen and (max-width: 700px) {
    padding: 70px 0;
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
`

const TokenName = styled(BodyM)`
  display: flex;
  align-items: center;
  margin: 0;
  span {
    padding-left: 5px;
    color: #a996ff;
  }
`

const TitleBox = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  flex-wrap: wrap;
  h1 {
    margin: 0;
  }
`

export default AssetsManaged
