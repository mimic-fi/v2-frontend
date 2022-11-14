import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import Page from '../components/Page'
import { Container } from '../styles/texts'
import useSmartVaults from '../hooks/useSmartVaults'

const SmartVaults = () => {
  //todo: add loader
  const smartVaults = useSmartVaults()
  console.log(smartVaults)
  let itemsToRender
  if (smartVaults && smartVaults.data && smartVaults.data.smartVaults) {
    itemsToRender = smartVaults.data.smartVaults.map(item => {
      return (
        <div key={item.id}>
          <Link to={'/smart-vaults/' + item.id}>
            <h2>{item.id}</h2>
          </Link>
        </div>
      )
    })
  }

  return (
    <Page>
      <SmartVaultsSection>
        <Container>{itemsToRender}</Container>
      </SmartVaultsSection>
    </Page>
  )
}

const SmartVaultsSection = styled.section`
  background: #121418;
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

export default SmartVaults
