import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import logo from '../assets/logo-navbar.svg'
import NetworkInfo from './NetworkInfo'

const Navbar = () => {
  const [width, setWidth] = useState(window.innerWidth)
  useEffect(() => {
    window.addEventListener('resize', () => setWidth(window.innerWidth))
  }, [])
  const medium = 700
  return (
    <NavbarSection>
      <NavbarContainer>
        {width < medium && <img src={logo} alt="" />}
        <NetworkInfo />
      </NavbarContainer>
    </NavbarSection>
  )
}

const NavbarSection = styled.section`
  z-index: 100;
  background: #1f2021;
  width: 100%;
  margin: auto;
`

const NavbarContainer = styled.div`
  margin: auto;
  max-width: 1140px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  @media only screen and (max-width: 700px) {
    justify-content: space-between;
    padding 0 20px;
  }
`

export default Navbar
