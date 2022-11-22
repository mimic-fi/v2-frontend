import React from 'react'
import styled from 'styled-components'
import { useParams } from 'react-router-dom'
import { Hm, BodyL } from '../styles/texts'
import useSmartVaultMetadata from '../hooks/useSmartVaultMetadata'

const SmartVaultDetail = () => {
  const params = useParams()
  const metadata = useSmartVaultMetadata(params.id)

  return metadata.data ? (
    <SmartVaultDetailSection>
      <Hm>{metadata.data.title || 'Smart vault'}</Hm>
      <BodyL>{metadata.data.description || ''}</BodyL>
      <hr />
    </SmartVaultDetailSection>
  ) : (
    <div />
  )
}

const SmartVaultDetailSection = styled.section`
  height: auto;
  max-width: 1140px;
  margin: auto;
  padding: 150px 80px 80px 80px;
  @media only screen and (max-width: 700px) {
    padding: 70px 20px 70px 20px;
  }
  color: white;
  text-align: left;
  h2,
  p {
    margin-left: 0;
    max-width: 620px;
  }
  hr {
    color: #fcfcfc;
    background: #fcfcfc;
    margin-top: 50px;
  }
`

export default SmartVaultDetail
