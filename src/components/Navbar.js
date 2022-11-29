import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import logo from '../assets/logo-navbar.svg'
import NetworkInfo from './ChainSelector'

const Navbar = ({ sidebar = true }) => {
  const [width, setWidth] = useState(window.innerWidth)
  useEffect(() => {
    window.addEventListener('resize', () => setWidth(window.innerWidth))
  }, [])
  const medium = 700
  return (
    <NavbarSection>
      <NavbarContainer sidebar={sidebar}>
        {(width < medium || sidebar === false) && <img src={logo} alt="" />}
        <NetworkInfo />
      </NavbarContainer>
    </NavbarSection>
  )
}

const NavbarSection = styled.section`
  z-index: 100;
  width: 100%;
  margin: auto;
  border: 1px solid #2d3034;
`

const NavbarContainer = styled.div`
  margin: auto;
  max-width: 1140px;
  height: 79px;
  padding 0 20px;
  display: flex;
  align-items: center;
  justify-content: ${props => props.sidebar === false ? 'space-between' : 'flex-end'};
  @media only screen and (max-width: 700px) {
    justify-content: space-between;
  }

`

export default Navbar
