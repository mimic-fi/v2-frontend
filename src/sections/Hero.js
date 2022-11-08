import React from 'react'
import styled from 'styled-components'
import { H1, BodyL, Container } from '../styles/texts'
import Page from '../components/Page'


const Hero = () => {
  return (
    <Page>
      <HeroSection>
        app home
      </HeroSection>
    </Page>
  )
}

const HeroSection = styled.section`
  height: auto;
  min-height: 1700px;
  padding: 80px;
  color: white;

`

export default Hero
