import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { Hxxs, BodyM } from '../styles/texts'
import useSmartVaultMetadata from '../hooks/useSmartVaultMetadata'
import sv from '../assets/smart-vault.svg'
import { shortenAddress } from '../utils/web3-utils'

const SmartVault = ({ smartVault, active }) => {
  const metadata = useSmartVaultMetadata(smartVault.id)

  if (
    (active === false &&
      (!metadata.data ||
        !metadata.data.deprecated ||
        metadata.data.deprecated === undefined ||
        metadata.data.deprecated === false)) ||
    (active === true && metadata.data && metadata.data.deprecated === true)
  ) {

    return (
      <></>
    )
  }
// /env/:id/history"
  return (
    <Link key={smartVault.id} to={'/env/' + smartVault.id + '/history'}>
      <SmartVaultCard
        deprecated={metadata.data && metadata.data.deprecated ? true : false}
      >
        <div>

          <img
            alt="smartvault"
            src={metadata.data && metadata.data.logo ? metadata.data.logo : sv}
          />
        </div>

          <Hxxs className={metadata.data && metadata.data.deprecated ? 'deprecated' : 'active'}>
            {metadata.data && metadata.data.title
              ? metadata.data.title
              : 'Smart vault'}
          </Hxxs>
          {metadata.data && metadata.data.deprecated &&<Tag>Deprecated</Tag>}
          
        <Address>{shortenAddress(smartVault.id, 8)}</Address>
      </SmartVaultCard>
    </Link>
  )
}

const SmartVaultCard = styled.section`
  background: #2d3034;
  opacity: ${props => (props.deprecated === true ? '0.4' : '1')};
  box-shadow: 0px 4px 40px rgba(26, 28, 30, 0.24);
  border-radius: 20px;
  padding: 30px;
  width: 212px;
  height: 323px;
  margin: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  img {
    height: 55px;
    border-radius: 100px;
    margin-bottom: 35px;
  }
  h6 {
    margin-bottom: 25px;
    min-height: 65px;
    &.deprecated {
      margin-bottom: 10px;
    }
  }
`
const Address = styled(BodyM)`
  color: #a996ff;
  font-weight: 700;
`

const Tag = styled(BodyM)`
  color: white;
  background: #a996ff;
  border-radius: 15px;
  margin: auto;
  margin-bottom: 10px;
  width: 150px;
`

export default SmartVault
