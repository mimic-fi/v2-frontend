import React from 'react'
import styled from 'styled-components'
import { useParams } from 'react-router-dom'
import { Hm, BodyL, Container } from '../styles/texts'
import useSmartVaultMetadata from '../hooks/useSmartVaultMetadata'

const SmartVaultDetail = () => {
  const params = useParams()
  const metadata = useSmartVaultMetadata(params.id)

  return metadata.data ? (
    <SmartVaultDetailSection>
    <Container>
      <Hm>{metadata.data.title || 'Smart vault'}</Hm>
      <BodyL>{metadata.data.description || ''}</BodyL>
      </Container>
    </SmartVaultDetailSection>
  ) : (
    <div />
  )
}

const SmartVaultDetailSection = styled.section`
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
`

export default SmartVaultDetail
