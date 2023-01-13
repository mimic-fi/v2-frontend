import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import logo from '../assets/logo-navbar.svg'
import NetworkInfo from './ChainSelector'
import { Container } from '../styles/texts'

const SubNavbar = ({address}) => {
  return (
    <HeroSection>
      <SmartVaultAddress address={address} />
      <Space />
      <OptionsNavigation />
  
    </HeroSection>
  )
}

const SmartVaultAddress = ({address}) => {
  return (
    <SVAddress>
    {address}
    </SVAddress>
  )
}

const OptionsNavigation = () => {
  return (
    <>
    <Menu className='selected'>Overview</Menu>
    <Menu className='selected'>Config</Menu>
    </>
  )
}


const SVAddress = styled.div`
  font-size: 15px;
  padding: 15px 30px;

`
const Space = styled.div`
  width: 100%;
`

const Menu = styled(Link)`
  font-size: 15px;
  padding: 15px 20px;
  .selected {
    color: "red";
  }
`

const HeroSection = styled.section`
  height: auto;
  padding: 20px 20px 20px 20px;
  @media only screen and (max-width: 700px) {
    padding: 100px 20px 20px 20px;
  }
  color: white;
  text-align: center;
  display: flex;
  justify-content: space-between;

  h2 {
    max-width: 750px;
    text-align: center;
  }
  button {
    background: transparent;
    border: 0px;
    color: #a996ff;
    font-family: 'GTWalsheimPro';
    padding-left: 7px;
    cursor: pointer;
    font-size: 18px;
    line-height: 28px;
    letter-spacing: 0.75px;
    @media only screen and (max-width: 700px) {
      font-size: 17px;
      line-height: 28px;
    }
    @media only screen and (min-width: 1440px) {
      font-size: 20px;
      line-height: 32px;
    }
  }
`

export default SubNavbar
