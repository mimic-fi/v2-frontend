import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

const Navbar = () => {
  const [, setWidth] = useState(window.innerWidth)
  useEffect(() => {
    window.addEventListener('resize', () => setWidth(window.innerWidth))
  }, [])

  return (
    <NavbarSection>
    </NavbarSection>
  )
}

const NavbarSection = styled.section`
  z-index: 100;
  background: transparent;
  background: #121418;
  position: fixed;
  top: 0;
  width: 100%;
  margin: auto;
`

export default Navbar
