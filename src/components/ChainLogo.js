import styled from 'styled-components'

const ChainLogo = ({ src }) => {
  return <Chain src={src} />
}

const Chain = styled.img`
  width: 25px;
  object-fit: scale-down;
`

export default ChainLogo
