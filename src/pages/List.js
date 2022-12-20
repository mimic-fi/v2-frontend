import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import Page from '../components/Page'
import { Container } from '../styles/texts'
import SmartVaultCard from '../sections/SmartVaultCard'
import useSmartVaults from '../hooks/useSmartVaults'

const SmartVaults = () => {
  //todo: add loader
  const { data, isLoading } = useSmartVaults()

  return (
    <Page sidebar={false}>
      <SmartVaultsSection>
        <Container>
          {isLoading ? 'Loading Smart Vaults...' :
          data?.length > 0 ? data.map(item => {
            return (
              <div key={item.id}>
                <Link to={'/smart-vaults/' + item.id}>
                  <SmartVaultCard smartVault={item} />
                </Link>
              </div>
            )
          })
            : 'No Smart Vaults here'
          
        }
        </Container>
      </SmartVaultsSection>
    </Page>
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
  h2 {
    color: violet;
  }
`

export default SmartVaults
