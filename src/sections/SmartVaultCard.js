import React from 'react'
import styled from 'styled-components'
import { Hxs, BodyS } from '../styles/texts'
import useSmartVaultMetadata from '../hooks/useSmartVaultMetadata'

const SmartVault = ({ smartVault }) => {
  const metadata = useSmartVaultMetadata(smartVault.id)
  console.log(smartVault, metadata)
  return (
    <SmartVaultCard>
      <Hxs>
        {metadata.data && metadata.data.title
          ? metadata.data.title
          : 'Smart vault'}
      </Hxs>
      <BodyS>{smartVault.id}</BodyS>
    </SmartVaultCard>
  )
}

const SmartVaultCard = styled.section`
  background: #2d3034;
  box-shadow: 0px 4px 40px rgba(26, 28, 30, 0.24);
  border-radius: 8px;
  padding: 30px;
  width: auto;
  margin: 30px 0;
`

export default SmartVault
