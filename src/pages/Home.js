import React from 'react'
import styled from 'styled-components'
import Page from '../components/Page'
import SearchBar from '../components/SearchBar'
import { Container, Hl } from '../styles/texts'

const Home = () => {
  return (
    <Page sidebar={false}>
      <HomeSection>
        <Container>
          <Hl>Search for your smart vault</Hl>
          <br />
          <SearchBar />
        </Container>
      </HomeSection>
    </Page>
  )
}

const HomeSection = styled.section`
  height: auto;
  padding-top: 180px;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  @media only screen and (max-width: 700px) {
    padding: 60px 0 0 0;
    text-align: center;
  }
`

export default Home
