import React from 'react'
import styled from 'styled-components'
import logo from '../assets/app-landing/footer-logo.svg'
import documentation from '../assets/app-landing/documentation.svg'
import github from '../assets/app-landing/github.svg'
import whitepaper from '../assets/app-landing/whitepaper.svg'
import medium from '../assets/app-landing/medium.svg'
import discord from '../assets/app-landing/discord.svg'
import twitter from '../assets/app-landing/twitter.svg'
import { LinkS, Container } from '../styles/texts'

const Footer = () => (
  <FooterSection>
    <FooterContainer>
      <div>
        <Logo alt="logo" src={logo} />
        <Text>
          Your go-to platform to automate and model operations in DeFi
        </Text>
      </div>
      <Box>
        <div>
          <h5>Developers</h5>
          <LinkS href="https://docs.mimic.fi/resources/whitepaper" target="_blank">
            <img src={whitepaper} alt="footer"/>Whitepaper
          </LinkS>
          <LinkS href="https://docs.mimic.fi/general/whats-mimic" target="_blank">
            <img src={documentation} alt="footer"/>Documentation
          </LinkS>
          <LinkS href="https://github.com/mimic-fi" target="_blank">
            <img src={github} alt="footer"/>Github
          </LinkS>
        </div>
        <div>
          <h5>Stay in touch</h5>
          <LinkS href="https://discord.com/invite/pZsRmtTgNa" target="_blank">
            <img src={discord} alt="footer"/>Discord
          </LinkS>
          <LinkS href="https://twitter.com/mimicfi" target="_blank">
            <img src={twitter} alt="footer"/>Twitter/X
          </LinkS>
          <LinkS href="https://medium.com/mimicfi" target="_blank">
            <img src={medium} alt="footer"/>Medium
          </LinkS>
        </div>
      </Box>
    </FooterContainer>
  </FooterSection>
)

const FooterSection = styled.section`
  height: auto;
  margin: auto;
  padding: 40px 0 150px 0;
  box-sizing: content-box;
  background: #12141a;
  width: 100%;

  h5,
  a {
    color: #fff;
    font-feature-settings: 'clig' off, 'liga' off;
    font-family: 'DMSansBold';
    font-size: 17px;
    font-style: normal;
    font-weight: 700;
    line-height: 150%;
    letter-spacing: 0.75px;
    img {
      margin-right: 15px;
    }
  }
`

const Logo = styled.img`
  height: 100px;
`

const Text = styled.p`
  color: white;
  font-family: 'DMSans';
  font-size: 18px;
  font-weight: 400;
  line-height: 32px;
  letter-spacing: 0.75px;
  max-width: 299px;
  text-align: left;
`

const Box = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 220px;

  @media only screen and (max-width: 700px) {
    flex-direction: column;
    text-align: left;
    gap: 0;
    div {
      text-align: left;
    }
  }
  gap: 68px;
  a {
    display: flex;
    align-items: center;
    margin: 12px 0;
    cursor: pointer;
    img {
      padding-right: 7px;
    }
  }
`

const FooterContainer = styled(Container)`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  flex-wrap: wrap;
  padding-top: 100px;
  height: auto;

  @media only screen and (max-width: 850px) {
    flex-direction: column;
  }
`

export default Footer
