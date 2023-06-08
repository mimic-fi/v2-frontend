import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import logo from '../assets/logov3.svg'

const Navbar = () => {
  return (
    <NavbarSection>
      <NavbarContainer>
        <Link to="/">
          <img alt="logo" src={logo} />
        </Link>

      </NavbarContainer>
    </NavbarSection>
  )
}

const NavbarSection = styled.section`
  z-index: 100;
  width: 100%;
  margin: auto;
  position: sticky;
  background: #12141A;
`

const NavbarContainer = styled.div`
  margin-left: 32px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding 0;
`

export default Navbar
