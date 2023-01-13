import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import logo from '../assets/logo-navbar.svg'
import NetworkInfo from './ChainSelector'
import { Container } from '../styles/texts'

const Navbar = () => {
  return (
    <NavbarSection>
      <NavbarContainer>
        <Link to="/">
          <img src={logo} alt="" />
        </Link>
        <NetworkInfo />
      </NavbarContainer>
    </NavbarSection>
  )
}

const NavbarSection = styled.section`
  z-index: 100;
  width: 100%;
  margin: auto;
  background: ${props => props.theme.main};
`

const NavbarContainer = styled(Container)`
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0;
`

export default Navbar
