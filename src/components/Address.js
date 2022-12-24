import styled from 'styled-components'
import { PLAYERS } from '../constants/playerAddress'
import { getEtherscanLink, shortenAddress } from '../utils/web3-utils'
import { useChainId } from '../hooks/useChainId'
import copyImg from '../assets/copy.svg'
import useCopyToClipboard from '../hooks/useCopyToClipboard'
import { SingleNameBlockies } from './Blockies'
import { useState } from 'react'


const Address = ({ address, showIdentity = true}) => {
  const chainId = useChainId()
  const indexPlayer = `${address}-${chainId}`
  const player = PLAYERS[indexPlayer]
  const [value, copy] = useCopyToClipboard()
  const [copied, setCopied] = useState(false)


  const pleaseCopy = () => {
    copy(address)
    setCopied(true)
    setTimeout(() => {
      setCopied(false)
    }, 5000)
  }

  return (<Container>
    {showIdentity && (player ? <MimicBadge player={player} /> 
    : <SingleNameBlockies imageSize={20} address={address} />)}
    <TextAddress
      href={getEtherscanLink(chainId, address, 'address')}
      target="_blank"
      rel="noreferrer"
    >
      {player ? `${player.name} (${shortenAddress(address)})` : address}
    </TextAddress>
    {copied ? <CopyText>ok</CopyText> : <ImgSm src={copyImg} onClick={() => pleaseCopy()} />}
  </Container>)
}

const MimicBadge = ({player}) => {
  return (
  <BadgeSm backgroundColor={player.backgroundColor}>
    <ImgBadge src={player.logoUrl} />
  </BadgeSm>
)}

const ImgSm = styled.img`
  height: 15px !important;
  width: 15px !important;
  padding: 0px !important;
  margin: 0px 5px;
  margin-top: 1px;

`

const ImgBadge = styled.img`
  height: 12px !important;
  width: 12px !important;
  padding: 0px !important;
`

const BadgeSm = styled.div`
  height: 20px;
  width: 20px;
  border-radius: 100px;
  background-color: ${props => (props.backgroundColor)};
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 5px;

`

const Container = styled.div`
 display: inline-flex;
 cursor: pointer;
 
`

const CopyText = styled.div`
  height: 15px !important;
  width: 15px !important;
  padding: 0px !important;
  margin: 0px 5px;
  margin-top: 1px;
  color: ${props => props.theme.mainDefault};

`

const TextAddress = styled.a`
  &:hover {
    transition: 0.15s ease color;
    color: ${props => props.theme.mainDefault};
  }
  
`

export default Address
