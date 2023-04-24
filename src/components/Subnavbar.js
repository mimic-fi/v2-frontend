import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { Container, BodyM } from '../styles/texts'
import { Skeleton } from '../styles/general'
import { useChainId } from '../hooks/useChainId'
import PageSelector from './PageSelector'
import OthersSelector from './OthersSelector'
import AddressOnChainDropdown from './AddressOnChainDropdown'

const Subnavbar = ({ active, address }) => {
  const chainId = useChainId()
  const [width, setWidth] = useState(window.innerWidth)

  useEffect(() => {
    window.addEventListener('resize', () => setWidth(window.innerWidth))
  }, [])
  const medium = 700
  console.log('render')

  return (
    <Container>
      <SubnavbarSection>
        <AddressBox>
          {address === undefined || !address ? (
            <Skeleton height="36px" width="500px" />
          ) : (
            <AddressOnChainDropdown address={address} />
          )}
        </AddressBox>
        {width <= medium ? (
          <PageSelector active={active} address={address} chainId={chainId} />
        ) : (
          <SubnavbarContainer>
            <Link to={`/smart-vaults/${address}/`}>
              <BodyM className={active === 'overview' ? 'active' : ''}>
                Overview
              </BodyM>
            </Link>
            <Link to={`/smart-vaults/${address}/action-history/`}>
              <BodyM className={active === 'history' ? 'active' : ''}>
                History
              </BodyM>
            </Link>
            <Link to={`/smart-vaults/${address}/config/`}>
              <BodyM className={active === 'configuration' ? 'active' : ''}>
                Configuration
              </BodyM>
            </Link>
            <OthersSelector address={address} chainId={chainId} />
          </SubnavbarContainer>
        )}
      </SubnavbarSection>
    </Container>
  )
}

const SubnavbarSection = styled.section`
  z-index: 100;
  width: 100%;
  display: flex;
  align-items: center;
  margin: auto;
  margin-top: 25px;
  justify-content: space-between;
  .active {
    color: #a996ff;
  }
`
const AddressBox = styled.div`
  width: 100%;
  text-align: left;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  height: 32px;
`

const SubnavbarContainer = styled.div`
  height: 60px;
  display: flex;
  width: 100%;
  justify-content: flex-end;
  gap: 40px;
  padding: 0px;
  a {
    display: flex;
    align-items: center;
  }
`

export default Subnavbar
