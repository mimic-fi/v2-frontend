import styled from 'styled-components'
import { PLAYERS } from '../constants/playerAddress'
import { shortenAddress } from '../utils/web3-utils'
import { useChainId } from '../hooks/useChainId'
import { BodyL } from '../styles/texts'


const AddressName = ({ address, title }) => {
  const chainId = useChainId()
  const indexPlayer = `${address}-${chainId}`
  const player = PLAYERS[indexPlayer]

  if (title) {
    if (player) {
      return (
        <Container>
          <BadgeXl backgroundColor={player.backgroundColor}>
            <ImgXl alt="logo" src={player.logoUrl} />
          </BadgeXl>
          <Box>
            <div>
              {title && title}
              <BodyL>
                {player.name} {' '}
                ({shortenAddress(address)})
              </BodyL>
            </div>
          </Box>
        </Container>
      )
    } else {
      // TODO: primitive executed by owners
      return (
        <Container>
          {shortenAddress(address)}
        </Container>
      )
    }
  } else {
    if (player) {
      return (
        <Container>
          <BadgeSm backgroundColor={player.backgroundColor}>
            <ImgSm alt="logo" src={player.logoUrl} />
          </BadgeSm>
          <Box>
            {player.name} {' '}
            ({shortenAddress(address)})
          </Box>
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
}

const ImgXl = styled.img`
  height: 30px !important;
  width: 30px !important;
  padding: 0px !important;
`

const BadgeXl = styled.div`
  height: 60px;
  width: 60px;
  border-radius: 500px;
  background-color: ${props => (props.backgroundColor)};
  display: flex;
  justify-content: center;
  align-items: center;
`

const ImgSm = styled.img`
  height: 15px !important;
  width: 15px !important;
  padding: 0px !important;
`

const BadgeSm = styled.div`
  height: 30px;
  width: 30px;
  border-radius: 100px;
  background-color: ${props => (props.backgroundColor)};
  display: flex;
  justify-content: center;
  align-items: center;
`

const Box = styled.div`
   display: flex;
  align-items: center;
  justify-content: flex-start;
  text-align: left;
  margin-left: 18px;
`

const Container = styled.div`
  display: flex;
  flex-direction: row;
  color: white;
  min-width: 250px;
  align-items: center;
  justify-content: center;
`

export default AddressName
