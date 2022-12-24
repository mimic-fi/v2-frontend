import createIcon from '../utils/blockies'
import styled from 'styled-components'

const BlockiesContainer = styled('span')

const Blockies = ({
  address,
  imageSize = 42,
  color,
  bgcolor,
  spotcolor,
  className
}) => {

  if (!address) return <>'No address'</>
  var imgURL = createIcon({
    seed: address.toLowerCase(),
    size: 8,
    scale: 5,
    color,
    bgcolor,
    spotcolor
  }).toDataURL()
  var style = {
    backgroundImage: 'url(' + imgURL + ')',
    backgroundSize: 'cover',
    width: imageSize + 'px',
    height: imageSize + 'px',
    display: 'inline-block'
  }

  return <span className={className} style={style} />
}

export default Blockies

export const SingleNameBlockies = styled(Blockies)`
  margin-right: 5px;
  border-radius: 50%;
  flex-shrink: 0;
`