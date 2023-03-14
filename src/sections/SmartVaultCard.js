import React from 'react'
import styled from 'styled-components'
import { Hxxs, BodyM } from '../styles/texts'
import useSmartVaultMetadata from '../hooks/useSmartVaultMetadata'
import sv from '../assets/smart-vault.svg'
import { shortenAddress } from '../utils/web3-utils'
import { formatTokenAmount } from '../utils/math-utils'
import { USDC_DECIMALS } from '../constants/knownTokenDecimals'

const SmartVault = ({ smartVault }) => {
  const metadata = useSmartVaultMetadata(smartVault.id)
  return (
    <SmartVaultCard>
      <div>
        <img
          alt="smartvault"
          src={metadata.data && metadata.data.logo ? metadata.data.logo : sv}
        />
        <Hxxs>
          {metadata.data && metadata.data.title
            ? metadata.data.title
            : 'Smart vault'}
        </Hxxs>
        <Body>$
        {formatTokenAmount(smartVault.totalValueManaged, USDC_DECIMALS, {
          digits: 2,
        })} total managed</Body>
      </div>
      <Address>{shortenAddress(smartVault.id, 10)}</Address>
    </SmartVaultCard>
  )
}

const SmartVaultCard = styled.section`
  background: #2d3034;
  box-shadow: 0px 4px 40px rgba(26, 28, 30, 0.24);
  border-radius: 20px;
  padding: 30px;
  width: 278px;
  height: 363px;
  margin: 30px 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  img {
    height: 55px;
    margin-bottom: 35px;
  }
  h6 {
    margin-bottom: 25px;
    min-height: 65px;
  }
`
const Address = styled(BodyM)`
  color: #a996ff;
  font-weight: 700;
`

const Body = styled(BodyM)`
  color: #777e91;
  margin: 0;
`

export default SmartVault
