import React from 'react'
import styled from 'styled-components'
import Page from '../components/Page'
import SearchBar from '../components/SearchBar'
import { Container, Hl, BodyL } from '../styles/texts'

const PageNotFound = () => {
  return (
    <Page>
      <PageNotFoundSection>
        <Container>
          <Hl>Page not found</Hl>
          <BodyL>
            Sorry, the page you are looking for doesn't exist or has benn moved.<br/>
            Try searching for a smart vault:
          </BodyL>
          <SearchBar />
        </Container>
      </PageNotFoundSection>
    </Page>
  )
}

const PageNotFoundSection = styled.section`
  background: #252627;
  height: auto;
  padding-top: 180px;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  @media only screen and (max-width: 700px) {
    min-height: 650px;
    padding: 60px 0 0 0;
  }
`

export default PageNotFound
