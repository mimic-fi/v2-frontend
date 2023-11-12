import React from 'react'
import styled from 'styled-components'
import { BodyL, Container } from '../styles/texts'
import balancer from '../assets/trusted/Balancer.svg'
import dxdao from '../assets/trusted/DXdao.svg'
import paraswap from '../assets/trusted/Paraswap.svg'
import tw from '../assets/trusted/Trustwallet.svg'
import thegraph from '../assets/trusted/thegraph.svg'
import inch from '../assets/trusted/1inch.svg'
import descentraland from '../assets/trusted/Descentraland.svg'

const TrustedBy = () => (
  <TrustedBySection>
    <Container>
      <Box>
        <BodyL>Trusted by</BodyL>
        <div>
        <img alt="Trustwallet" src={tw} />
        <img alt="1inch" src={inch} />
        <img alt="Paraswap" src={paraswap} />
        <img alt="Balancer" src={balancer} />
        <img alt="DXDao" src={dxdao} />
        <img alt="Descentraland" src={descentraland} />
        <img alt="The graph" src={thegraph} />
        </div>
      </Box>
    </Container>
  </TrustedBySection>
)

const TrustedBySection = styled.section`
  background: transparent;
  height: auto;

`

const Box = styled.div`
  max-width: 900px;
  margin: auto;
  padding: 70px 0 70px 0;
  @media only screen and (max-width: 700px) {
    padding: 120px 0 0 0;
  }
  text-align: center;
  p {
    color: #a5a1b7;
  }
  img {
    height: 100px;
    @media only screen and (max-width: 700px) {
      height: 70px;
    }
  }
  div {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    align-items: center;
    column-gap: 15px;
    @media only screen and (max-width: 1124px) {
      justify-content: center;
    }
  }
`

export default TrustedBy
