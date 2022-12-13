import styled from 'styled-components'
import { PLAYERS } from '../constants/playerAddress'
import { shortenAddress } from '../utils/web3-utils'
import { useChainId } from '../hooks/useChainId'


const AddressName = ({ address }) => {
  const chainId = useChainId()
  const indexPlayer = `${address}-${chainId}`
  const player = PLAYERS[indexPlayer]

  if (player) {
    return (
      <Container>
        <Img src={player.logoUrl} backgroundColor={player.backgroundColor}></Img>
        <Name>
          {player.name}
        </Name>
        ({shortenAddress(address)})
      </Container>
    )
  } else {
    return (
      <Container>
        {shortenAddress(address)}
      </Container>
    )
  }

}

const Img = styled.img`
  color: white;
  height: 20px;
  width: 20px;
  background-color: ${props => (props.backgroundColor)};
  border-radius: 100px;
  padding: 5px;
`

const Name = styled.div`
  color: white;
  margin: 0 10px;
  flex-wrap: nowrap;

`

const Container = styled.div`
  display: flex;
  flex-direction: row;
  color: white;
  min-width: 250px;
  align-items: center;
`

export default AddressName
