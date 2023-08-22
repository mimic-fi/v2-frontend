import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import Footer from '../components/AppLandingFooter'
import AppLandingCards from '../components/AppLandingCards'
import SearchBar from '../components/SearchBar'
import TrustedBy from '../sections/TrustedBy'
import background from '../assets/appLandingBackground.png'
import spotlightbackground from '../assets/spotlight.png'
import logo from '../assets/logo.svg'
import medium from '../assets/medium-large.svg'
import { Container } from '../styles/texts'

const Home = () => {

  return (
    <div>
      <Navbar />
      <div style={{ minHeight: 'calc(100vh - 490px)', background: '#12141A' }}>
        <HomeSection background={background}>
          <Container>
            <TitleContainer>
              <Title>Welcome to our diving pool!</Title>
              <Title className="violet">+25,000 tasks run this week</Title>
            </TitleContainer>
            <Searchbox>
              <div>
                <h2>Find enviroment</h2>
                <SearchBar />
              </div>
            </Searchbox>
          </Container>
        </HomeSection>
        <HomeSection>
          <Container>
            <TrustedBy />
            <Text style={{ marginTop: '100px' }} left={true}>
              Featured environments
            </Text>
            <AppLandingCards />
            <Text style={{ marginTop: '200px' }} left={true}>
              Spotlight
            </Text>
            <Spotlight />
          </Container>
        </HomeSection>
      </div>
      <Footer />
    </div>
  )
}

const Navbar = props => {
  return (
    <NavbarSection>
      <NavbarContainer>
        <Link to="/">
          <img alt="logo" src={logo} />
        </Link>
        <NavbarLink>
          Learn more in{' '}
          <a target="_blank" href="https://mimic.fi" rel="noreferrer">
            Mimic.fi
          </a>
        </NavbarLink>
      </NavbarContainer>
    </NavbarSection>
  )
}

const Spotlight = props => {
  return (
    <SpotlightSection
      background={spotlightbackground}
      href="https://medium.com/mimicfi/introducing-mimic-v3-diving-into-new-depths-of-efficiency-4e564ad2714a"
      rel="noreferrer"
      target="_blank"
    >
      <div>
        <h3>Mimic v3 is now live!</h3>
        <p>
          Dive into new depths of efficiency we a ton of exciting new features
        </p>
      </div>
      <div>
        <button>Read story</button>
        <p>
          Will open on <img src={medium} alt="medium"/>
        </p>
      </div>
    </SpotlightSection>
  )
}

const SpotlightSection = styled.a`
  background: url(${props => props.background}) no-repeat top center;
  height: auto;
  padding: 50px 0 0 0;
  color: white;
  width: 100%;
  border-radius: 24px;
  min-height: 130px;
  margin-bottom: 200px;
  display: flex;
  algin-items: center;
  justify-content: space-between;
  text-align: left;
  padding: 50px 50px 0 50px;
  color: white;
  h3 {
    font-family: 'VisbyBold';
    font-size: 40px;
    font-style: normal;
    margin: 13px 0 20px 0;
    line-height: 24px;
  }
  button {
    padding: 18px 50px;
    border-radius: 16px;
    border: 0px;
    color: #6f5ce6;
    text-align: center;
    font-feature-settings: 'clig' off, 'liga' off;
    font-family: 'DMSansBold';
    font-size: 16px;
    font-weight: 700;
    line-height: 20px;
  }
`

const NavbarSection = styled.section`
  z-index: 100;
  width: 100%;
  margin: auto;
  position: sticky;
  background: #12141a;
`

const NavbarContainer = styled.div`
  margin: 0 32px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding 0;
`
const Text = styled.p`
  color: white;
  text-align: ${props => (props.left ? 'left' : 'center')};

  font-family: 'DMSans';
  font-size: 18px;
  font-weight: 400;
  line-height: 32px;
  letter-spacing: 0.75px;
`
const NavbarLink = styled(Text)`
  color: #a5a1b7;
  font-feature-settings: 'clig' off, 'liga' off;
  a {
    font-weight: 700;
    color: #6f5ce6;
    font-family: 'DMSansBold';
  }
`

const Title = styled.h1`
  color: white;
  font-family: 'VisbyBold';
  font-size: 56px;
  font-style: normal;
  font-weight: 500;
  line-height: 125%;
  margin: 0;
  &.violet {
    color: #6f5ce6;
  }
`

const TitleContainer = styled.div`
  margin-top: 50px;
  margin-bottom: 150px;
`

const HomeSection = styled.section`
  background: url(${props => props.background}) no-repeat top center;
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
  max-width: 900px;
  background: #6f5ce6;
  margin: auto;
  margin-bottom: -90px;
  border-radius: 24px;

  align-items: center;
  justify-content: center;
  display: flex;
  padding: 45px 0;
  h2 {
    color: white;
    font-family: 'VisbyBold';
    font-size: 19px;
    margin: 0;
    font-style: normal;
    font-weight: 500;
    line-height: 110%;
    letter-spacing: -0.48px;
    margin: 0;
    text-align: left;
  }
  form {
    margin: 10px 0;
    input {
      background: #584cb0;
    }
  }
`

export default Home
