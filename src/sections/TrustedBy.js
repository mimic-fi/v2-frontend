import React from 'react'
import styled from 'styled-components'
import { BodyL, Container } from '../styles/texts'
import balancer from '../assets/trusted/Balancer.svg'
import dxdao from '../assets/trusted/DXdao.svg'
import paraswap from '../assets/trusted/Paraswap.svg'
import descentraland from '../assets/trusted/Descentraland.svg'

const TrustedBy = () => (
  <TrustedBySection>
    <Container>
      <Box>
        <BodyL>Trusted by</BodyL>
        <div>
          <img src={balancer} />
          <img src={paraswap} />
          <img src={dxdao} />
          <img src={descentraland} />
        </div>
      </Box>
    </Container>
  </TrustedBySection>
)

const TrustedBySection = styled.section`
  background: transparent;
  height: auto;
  @media only screen and (max-width: 700px) {
    min-height: 650px;
    padding: 60px 0 0 0;
  }
`

const Box = styled.div`
  max-width: 780px;
  margin: auto;
  padding: 70px 0 70px 0;
  text-align: center;
  p {
    color: #a5a1b7;
  }
  div {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    align-items: center;
    @media only screen and (max-width: 800px) {
      justify-content: center;
    }
  }
`

export default TrustedBy
