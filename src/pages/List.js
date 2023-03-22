import React from 'react'
import styled from 'styled-components'
import Page from '../components/Page'
import { Skeleton } from '../styles/general'
import { Container, Hl } from '../styles/texts'
import SmartVaultCard from '../sections/SmartVaultCard'
import useSmartVaults from '../hooks/useSmartVaults'

const SmartVaults = () => {
  //todo: add loader
  const { data, isLoading } = useSmartVaults()
  if (isLoading) {
    return (
      <Page sidebar={false}>
        <SmartVaultSection>
          <Title>Browse Smart vaults</Title>
          <ListContainer>
            <br />
            <Skeleton height="890px" width="100%" marginBottom="30px" />
          </ListContainer>
        </SmartVaultSection>
      </Page>
    )
  }

  return (
    <Page sidebar={false}>
      <SmartVaultSection>
        <Title>Browse Smart vaults</Title>
        <ListContainer>
          {isLoading ? (
            'Loading Smart Vaults...'
          ) : data?.length > 0 ? (
            <>
              {data.map(item => {
                return <SmartVaultCard smartVault={item} active={true} key={'active' + item.id}/>
              })}
              {data.map(item => {
                return <SmartVaultCard smartVault={item} active={false} key={'noactive' + item.id} />
              })}
            </>
          ) : (
            'No Smart Vaults here'
          )}
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
  text-align: center;
  @media only screen and (max-width: 700px) {
    min-height: 650px;
    padding: 60px 0 0 0;
  }
`

const ListContainer = styled(Container)`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-wrap: wrap;
  gap: 25px;
  max-width: 1180px;
`

const Title = styled(Hl)`
  margin: 0 auto 100px auto;
`

export default SmartVaults
