import React from 'react'
import styled from 'styled-components'
import SearchBar from '../components/SearchBar'
import { CHAIN_INFO } from '../constants/chainInfo'
import { useChainId } from '../hooks/useChainId'
import { Container, Hm, BodyM, BodyL } from '../styles/texts'

const SmartVaultNotFound = ({id = ''}) => {
  const chainId = useChainId()
  
  return (
      <SmartVaultNotFoundSection>
        <Container>
          <Text>
            <BodyL>Smart Vault not found</BodyL>
            <Hm>Sorry, we can’t find a Smart Vault with that address, on {CHAIN_INFO[chainId].label}</Hm>
            <BodyM>
              Please double check or change networks, and try again
            </BodyM>
            <br />
            <SearchBar value={id}/>
          </Text>
        </Container>
      </SmartVaultNotFoundSection>
  )
}

const SmartVaultNotFoundSection = styled.section`
  box-sizing: border-box;
  min-height: calc(100vh - 60px);
  height: auto;
  padding-top: 120px;
  color: white;
  text-align: left;
  @media only screen and (max-width: 700px) {
    min-height: 650px;
    padding: 60px 0 0 0;
  }
`

const Text = styled.div`
  max-width: 792px;
`

export default SmartVaultNotFound
