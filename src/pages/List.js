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
      <SmartVaultSection>
        <ListContainer>
          {isLoading ? 'Loading Smart Vaults...' :
            data?.length > 0 ? data.map(item => {
              return (
                  <Link key={item.id} to={'/smart-vaults/' + item.id}>
                    <SmartVaultCard smartVault={item} />
                  </Link>
              )
            })
              : 'No Smart Vaults here'
          }
        </ListContainer>
      </SmartVaultSection>
    </Page>
  )
}

const SmartVaultSection = styled.section`
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

const ListContainer = styled(Container)`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-wrap: wrap;
  gap: 25px;
`

export default SmartVaults
