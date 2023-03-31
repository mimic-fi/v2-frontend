import React from 'react'
import styled from 'styled-components'
import { Hxl, Container, BodyM } from '../styles/texts'
import Table from '../components/Table/Table'
import TableRow from '../components/Table/TableRow'
import TableCell from '../components/Table/TableCell'
import TableHeader from '../components/Table/TableHeader'
import tokenSample from '../assets/token-sample.svg'
import { useTokensBalance } from '../hooks/useTokenBalance'

const AssetsManaged = ({ address }) => {
  const results = useTokensBalance(address)
  return (
    <AssetsManagedSection>
      <Container>
        <Hxl>
          Assets being
          <br />
          managed
        </Hxl>
        <Table
          header={
            <TableRow>
              <TableHeader title="Coin" align="left" />
              <TableHeader title="Vault total" align="left" />
              <TableHeader title="" align="center" />
            </TableRow>
          }
        >
          {Object.values(results).map((token, i) => {
            if (token.balance === '0') {
              return 
            }
            return (
              <TableRow key={i}>
                <TableCell align="left">
                  <TokenName>
                    <img
                      src={token.logoURI.replace(
                        'ipfs://',
                        'https://ipfs.io/ipfs/'
                      )}
                      alt="Logo"
                      onError={e => {
                        e.target.onerror = null
                        e.target.src = tokenSample
                      }}
                    />
                    {token.name}, <span>{token.symbol}</span>
                  </TokenName>
                </TableCell>
                <TableCell align="left">{token.balance}</TableCell>
                <TableCell align="center">manage</TableCell>
              </TableRow>
            )
          })}
        </Table>
      </Container>
    </AssetsManagedSection>
  )
}

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

export default AssetsManaged
