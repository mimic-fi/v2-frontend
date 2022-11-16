import styled from 'styled-components'
import { getChainInfo } from '../constants/enviroment'


const NetworkInfo = () => {
  const chainInfo = getChainInfo()

  return (
    <Container>
      <NetwrokLogo src={chainInfo.logoUrl} />
      <NetworkName>
        {chainInfo.label}
      </NetworkName>
    </Container>
  )
}

const NetwrokLogo = styled.img`
 fill: aqua;
`

const NetworkName = styled.div`
 padding: 0px 5px;
`

const Container = styled.div`
  display: flex;
  height: 100%;
  align-items: center;
  color: white
`

export default NetworkInfo
