import React from 'react'
import styled from 'styled-components'
import NetworkInfo from './NetworkInfo'

const Navbar = () => {
  return (
    <NavbarSection>
      <NavbarContainer>
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
`

export default Navbar
