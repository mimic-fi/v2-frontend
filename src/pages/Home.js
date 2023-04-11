import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Page from '../components/Page'
import SearchBar from '../components/SearchBar'
import TrustedBy from '../sections/TrustedBy'
import split from '../assets/split.svg'
import { Container, Hxl, BodyL } from '../styles/texts'

const Home = () => {
  const [width, setWidth] = useState(window.innerWidth)
  useEffect(() => {
    window.addEventListener('resize', () => setWidth(window.innerWidth))
  }, [])
  const medium = 700
  return (
    <Page sidebar={false}>
      <div style={{ minHeight: 'calc(100vh - 490px)' }}>
        <HomeSection>
          <Container>
            <BodyL>Welcome to Mimic!</BodyL>
            <Hxl>Search a Smart Vault</Hxl>
            <br />
            <Searchbox>
              <SearchBar />
            </Searchbox>
            <TrustedBy />
          </Container>
        </HomeSection>
        <Split src={split} />
        <HomeSection>
          <Container>
            {width >= medium ? (
              <Hxl style={{ maxWidth: '790px', paddingTop: '300px' }}>
                Deploy your Smart Vault in as little as 2 weeks
              </Hxl>
            ) : (
              <Hxl style={{ paddingTop: '100px' }}>
                Deploy your Smart Vault in as little as 2 weeks
              </Hxl>
            )}
            <BodyL>
              Let us help you find the best Smart Vault configuration for your
              business
            </BodyL>
            <br />
            <Button
              href="https://airtable.com/shrSvH8fTJcbHq0xl"
              target="_blank"
            >
              Contact us
            </Button>
          </Container>
        </HomeSection>
      </div>
    </Page>
  )
}

const HomeSection = styled.section`
  height: auto;
  padding: 100px 0 0 0;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  @media only screen and (max-width: 700px) {
    padding: 0;
  }
  h2 {
    text-align: center;
  }
`

const Searchbox = styled.div`
  max-width: 780px;
  margin: auto;
  align-items: center;
  justify-content: center;
  display: flex;
`

const Split = styled.img`
  width: 100%;
  position: absolute;
`

const Button = styled.a`
  background: #5542a9;
  border-radius: 100px;
  padding: 22px 60px;
  margin-top: 30px;
  display: inline-block;
  font-weight: bold;
`

export default Home
