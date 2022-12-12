import React from 'react'
import styled from 'styled-components'
import logo from '../assets/footer-logo.svg'
import { BodyL, LinkS, Container } from '../styles/texts'

const Footer = () => (
  <FooterSection>
    <FooterContainer>
      <div>
        <img src={logo} alt="" />
        <BodyL>We make DeFi interaction simpler, safer & smarter!</BodyL>
      </div>
      <Box>
        <div>
          <h5>About us</h5>
          <LinkS href="https://medium.com/mimicfi" target="_blank">
            What’s new
          </LinkS>
        </div>
        <div>
          <h5>Keep in touch</h5>
          <LinkS href="https://discord.com/invite/pZsRmtTgNa" target="_blank">
            Join us on Discord
          </LinkS>
          <LinkS href="https://twitter.com/mimicfi" target="_blank">
            Twitter
          </LinkS>
          <LinkS href="https://airtable.com/shrSvH8fTJcbHq0xl" target="_blank">
            Contact us
          </LinkS>
        </div>
      </Box>
    </FooterContainer>
  </FooterSection>
)

const FooterSection = styled.section`
  height: auto;
  max-width: 1140px;
  margin: auto;
  padding: 80px 0 150px 0;
  box-sizing: border-box;
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
  border-top: solid 2px #c7c7c7;
  padding-top: 100px;
  height: auto;

  @media only screen and (max-width: 850px) {
    flex-direction: column;
  }
  p {
    max-width: 280px;
  }
  h5 {
    font-family: 'GTWalsheimPro';
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 32px;
    color: #a5a1b7;
  }
`

export default Footer
