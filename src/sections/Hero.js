import React from 'react'
import styled from 'styled-components'
import { H1, BodyL, Container } from '../styles/texts'
import usePrimitiveExecutions from '../hooks/usePrimitiveExecutions'

const Hero = () => {
  const primitiveExecutions = usePrimitiveExecutions()
  console.log(primitiveExecutions.data)
  let itemsToRender
  if (primitiveExecutions && primitiveExecutions.data) {
    itemsToRender = primitiveExecutions.data.map(item => {
      return (
        <div key={item.id}>
          <h2>{item.type}</h2> <p>excecuted at: {item.executedAt}</p>
        </div>
      )
    })
  }

  return (
    <HeroSection>
      <Container>
        <H1>Interact with DeFi in a simpler, safer way through Smart Vaults</H1>
        <BodyL>
          Our platform helps you grow your business by transforming manual work
          into automated actions.
        </BodyL>
        {itemsToRender}
      </Container>
    </HeroSection>
  )
}

const HeroSection = styled.section`
  background: #121418;
  height: auto;
  min-height: 1700px;
  padding-top: 80px;
  color: white;
  @media only screen and (max-width: 700px) {
    min-height: 650px;
    padding: 60px 0 0 0;
  }
  h2{
    color: violet;
  }
`

export default Hero
